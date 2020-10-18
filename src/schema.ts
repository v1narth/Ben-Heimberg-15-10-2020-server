import {
  arg,
  intArg,
  makeSchema,
  mutationType,
  objectType,
  queryType,
  stringArg,
  subscriptionType,
} from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import { PrismaClient } from '@prisma/client'
import { GraphQLDateTime } from 'graphql-iso-date'
import { PubSub } from 'apollo-server-express'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const pubsub = new PubSub()

const validateJWTToken = async (bearerToken: string | undefined) => {
  const token = bearerToken?.split(' ')[1]

  if (token) {
    const id = jwt.verify(token, process.env.JWT_SECRET!)

    if (id) {
      try {
        return await prisma.user.findOne({ where: { senderId: String(id) } })
      } catch (e) {
        console.error(`Could not find user with id ${id}`)
      }
    }

    return null
  }
}

const Message = objectType({
  name: 'Message',
  definition(t) {
    t.model.id()
    t.model.sender()
    t.model.receiver()
    t.model.subject()
    t.model.message()
    t.model.createdAt()
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.senderId()
  },
})

const Query = queryType({
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve: async (root, args, ctx) => {
        return (
          (await validateJWTToken(ctx.info.req.headers.authorization)) ?? null
        )
      },
    })

    t.field('messages', {
      type: 'Message',
      list: true,
      resolve: async () => {
        return await prisma.message.findMany({ orderBy: { id: 'desc' } })
      },
    })

    t.field('userMessages', {
      type: UserMessages,
      args: {
        id: stringArg({ required: false }),
      },
      resolve: async (root, args, ctx) => {
        let sent: any[]
        let received: any[]
        const user = await validateJWTToken(ctx.info.req.headers.authorization)

        if (user) {
          sent = await prisma.message.findMany({
            where: { sender: user.senderId },
            orderBy: { id: 'desc' },
          })
          received = await prisma.message.findMany({
            where: { receiver: user.senderId },
            orderBy: { id: 'desc' },
          })
        } else if (args.id) {
          sent = await prisma.message.findMany({ where: { sender: args.id } })
          received = await prisma.message.findMany({
            where: { receiver: args.id },
          })
        } else {
          throw 'No authentication token, or id received from client.'
        }

        return {
          sent: sent!,
          received: received!,
        }
      },
    })
  },
})

const UserMessages = objectType({
  name: 'UserMessages',
  definition(t) {
    t.field('sent', {
      type: 'Message',
      list: true,
    })

    t.field('received', {
      type: 'Message',
      list: true,
    })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneMessage({
      resolve: async (root, args, ctx) => {
        const message = await prisma.message.create(args)
        const sender = await prisma.user.findOne({
          where: { senderId: args.data.sender },
        })
        const receiver = await prisma.user.findOne({
          where: { senderId: args.data.receiver },
        })

        if (!sender) {
          await prisma.user.create({ data: { senderId: args.data.sender } })
        }

        if (!receiver) {
          await prisma.user.create({ data: { senderId: args.data.receiver } })
        }

        pubsub.publish('messageCreated', message)
        return message
      },
    })

    t.crud.deleteOneMessage()

    t.field('login', {
      type: 'LoginPayload',
      args: {
        id: stringArg({ required: true }),
      },
      resolve: async (root, { id }, ctx) => {
        const user = await prisma.user.findOne({ where: { senderId: id } })
        if (user) {
          const accessToken = jwt.sign(id, process.env.JWT_SECRET!)

          return {
            accessToken,
            user,
          }
        }

        return null
      },
    })
  },
})

const LoginPayload = objectType({
  name: 'LoginPayload',
  definition(t) {
    t.field('accessToken', {
      type: 'String',
    })

    t.field('user', {
      type: 'User',
    })
  },
})

const Subscription = subscriptionType({
  definition(t) {
    t.field('messageCreated', {
      type: 'Message',
      resolve: (payload) => payload,
      subscribe: () => pubsub.asyncIterator(['messageCreated']),
    })
  },
})

export const schema = makeSchema({
  shouldGenerateArtifacts: true,
  types: [Query, Mutation, Subscription, Message, User, LoginPayload],
  plugins: [
    nexusSchemaPrisma({
      experimentalCRUD: true,
      scalars: {
        DateTime: GraphQLDateTime,
      },
    }),
  ],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})

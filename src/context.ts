import { ExpressContext } from 'apollo-server-express/dist/ApolloServer'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export interface Context {
  prisma: PrismaClient
  info: ExpressContext
}

export function createContext(ctx: { req: any; res: any }): Context {
  return { prisma, info: ctx }
}


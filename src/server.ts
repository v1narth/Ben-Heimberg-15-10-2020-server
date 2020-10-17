require('dotenv').config()
import express from 'express'
import cors from 'cors'
import * as http from 'http'
import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { createContext } from './context'

const app = express()

app.use(cors())
app.use(express.json())

const apollo = new ApolloServer({
  schema,
  context: createContext
})

const server = http.createServer(app)

apollo.applyMiddleware({ app })
apollo.installSubscriptionHandlers(server)

server.listen({ port: process.env.PORT, host: process.env.HOST }, () => console.log(`Server ready at http://${process.env.HOST}:${process.env.PORT}`))



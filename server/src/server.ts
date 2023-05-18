import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import { memoryRoutes } from './routes/memory'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes, { prefix: '/auth' })
app.register(memoryRoutes, { prefix: '/memory' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('=> Server Running'))

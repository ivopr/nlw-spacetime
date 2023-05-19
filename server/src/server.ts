import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import multipart from '@fastify/multipart'
import jwt from '@fastify/jwt'
import { authRoutes } from './routes/auth'
import { memoryRoutes } from './routes/memory'
import { uploadRoutes } from './routes/upload'
import fstatic from '@fastify/static'
import { resolve } from 'path'

const app = fastify()

app.register(multipart)

app.register(fstatic, {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'spacetime',
})

app.register(authRoutes, { prefix: '/auth' })
app.register(uploadRoutes, { prefix: '/upload' })
app.register(memoryRoutes, { prefix: '/memory' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('=> Server Running'))

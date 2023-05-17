import fastify from 'fastify'
import { memoryRoutes } from './routes/memory'
import cors from '@fastify/cors'

const app = fastify()
app.register(cors, {
  origin: true,
})
app.register(memoryRoutes, { prefix: '/memory' })

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('=> Server Running'))

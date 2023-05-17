import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const app = fastify()
const prisma = new PrismaClient()

app.get('/', async () => {
  const users = await prisma.user.findMany()

  return users
})

app
  .listen({
    host: '0.0.0.0',
    port: 3333,
  })
  .then(() => console.log('=> Server Running'))

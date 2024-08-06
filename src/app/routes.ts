import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'

import { deductBalance } from './wallet'

type CustomRequest = FastifyRequest<{
  Body: { userId: number; amount: number }
}>

async function routes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  // endpoint 1
  fastify.get('/items', async (request, reply) => {
    return { hello: '12345' }
  })

  // endpoint 2
  fastify.post('/wallet', _options, async (request: CustomRequest, reply) => {
    deductBalance({
      userId: request.body.userId,
      amount: request.body.amount,
    })
  })
}

export default routes

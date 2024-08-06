import { FastifyInstance, FastifyPluginOptions } from 'fastify'

async function routes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  // endpoint 1
  fastify.get('/items', async (request, reply) => {
    return { hello: '12345' }
  })

  // endpoint 2
  //  fastify.post('/wallet', { schema }, async (request, reply) => {
  //   const result = await collection.insertOne({ animal: request.body.animal })
  //   return result
  //  })
}

export default routes

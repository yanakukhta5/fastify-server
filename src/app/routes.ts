import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify'

import { fetchItemsWithCache } from './items'

import { deductBalance } from './wallet'

type CustomRequest = FastifyRequest<{
  Body: { userId: number; amount: number }
}>

async function routes(
  fastify: FastifyInstance,
  _options: FastifyPluginOptions
) {
  // endpoint 1
  fastify.get('/items', async (_request, reply) => {
    try {
      const items = await fetchItemsWithCache({ isTradable: false })
      const tradableItems = await fetchItemsWithCache({ isTradable: true })

      const itemsWithPrices = items.map((item) => {
        const tradableItem = tradableItems.find(
          (tItem) => tItem.market_hash_name === item.market_hash_name
        )
        const tradablePrice = tradableItem ? tradableItem.min_price : null
        return {
          ...item,
          non_tradable_price: item.min_price,
          tradable_price: tradablePrice,
        }
      })

      reply.send(itemsWithPrices)
    } catch (error) {
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  // endpoint 2
  fastify.post('/wallet', _options, async (request: CustomRequest, reply) => {
    const { userId, amount } = request.body
    deductBalance({ userId, amount })
    reply.send({ status: 'Balance updated' })
  })
}

export default routes

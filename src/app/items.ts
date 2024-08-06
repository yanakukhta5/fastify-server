import axios from 'axios'
import Redis from 'ioredis'

const itemsEndpoint = 'https://api.skinport.com/v1/items'

const client = new Redis()

const DEFAULT_APP_ID = 730
const DEFAULT_CURRENCY = 'EUR'

client.on('error', (err) => {
  throw new Error(`Redis error: ${err}`)
})

export async function fetchItemsWithCache({ isTradable }) {
  const cacheKey = `skinport:items:${DEFAULT_APP_ID}:${DEFAULT_CURRENCY}:${isTradable}`

  const cachedData = await new Promise((resolve, reject) => {
    client.get(cacheKey, (err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })

  if (cachedData) {
    return JSON.parse(cachedData as string)
  }

  const response = await axios.get(itemsEndpoint, {
    params: {
      app_id: DEFAULT_APP_ID,
      currency: DEFAULT_CURRENCY,
      tradable: isTradable ? 1 : 0,
    },
  })

  const data = response.data

  client.setex(cacheKey, 300, JSON.stringify(data))

  return data
}

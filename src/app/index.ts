import Fastify, { FastifyServerOptions } from 'fastify'

import routes from './routes'

export type AppOptions = Partial<FastifyServerOptions>

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options)
  fastify.register(routes)

  return fastify
}

export { buildApp }

import Fastify, { FastifyServerOptions } from 'fastify'

import routes from './routes'

export type AppOptions = Partial<FastifyServerOptions>

async function buildApp(options: AppOptions = {}) {
  const fastify = Fastify(options)

  fastify.setErrorHandler((_error, _request, reply) => {
    reply.status(500).send({ ok: false })
  })

  fastify.register(routes)

  return fastify
}

export { buildApp }

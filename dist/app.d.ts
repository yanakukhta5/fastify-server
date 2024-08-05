import { FastifyServerOptions } from 'fastify';
export type AppOptions = Partial<FastifyServerOptions>;
declare function buildApp(options?: AppOptions): Promise<import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>>;
export { buildApp };

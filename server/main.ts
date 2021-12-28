import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter
} from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new FastifyAdapter({
      logger: process.env.NODE_ENV !== 'production'
    })
  )

  await app.listen(process.env.NEST_PORT)
}

bootstrap()
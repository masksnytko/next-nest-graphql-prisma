import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { PrismaService } from './prisma/prisma.service'
import { UserResolver } from './user/user.resolver'
import { UserService } from './user/user.service'

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(__dirname, '../server.schema.graphql')
    })
  ],
  providers: [PrismaService, UserService, UserResolver]
})
export class AppModule {}
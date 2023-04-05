import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UserResolver } from './resolvers/user.resolver';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => {
        const url = 'mongodb://localhost:27017/mydb';
        return {
          uri: url,
        };
      },
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      subscriptions: {
        'subscriptions-transport-ws': {
          path: '/graphql',
        },
      },
    }),
  ],
  controllers: [],
  providers: [AppService, UserResolver],
})
export class AppModule {}

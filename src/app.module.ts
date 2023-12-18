

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RankingsModule } from './rankings/rankings.module';
import { ProxyrmqModule } from './proxyrmq/proxyrmq.module';



@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: `${configService.get('MONGO_DB')}`,
        autoCreate: true,
      }),
      inject: [ConfigService]
    }),
    RankingsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProxyrmqModule
  ],
})
export class AppModule {}





import { Module } from '@nestjs/common';
import { RankingsService } from './rankings.service';
import { RankingsController } from './rankings.controller';

import { MongooseModule } from '@nestjs/mongoose'
import { ProxyrmqModule } from 'src/proxyrmq/proxyrmq.module';
import { RankingSchema } from './interfaces/ranking.schema';



@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Ranking', schema: RankingSchema}
  ]), ProxyrmqModule
],
  providers: [RankingsService],
  controllers: [RankingsController]
})
export class RankingsModule {}

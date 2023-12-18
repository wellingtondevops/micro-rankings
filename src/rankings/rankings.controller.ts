import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext, MessagePattern } from '@nestjs/microservices';

import { RankingsService } from './rankings.service'
import { RankingResponse } from './interfaces/ranking-response.interface'
import { Partida } from './interfaces/partida.interfaces';
import { TOPICS } from 'src/common/environments';

const ackErros: string[] = ['E11000']

@Controller()
export class RankingsController {

    constructor(private readonly rankingsService: RankingsService){}

    private readonly logger = new Logger(RankingsController.name)

    @EventPattern(TOPICS.PROCESSAR_PARTIDA)
    async processarPartida(
        @Payload() data: any,
        @Ctx() context: RmqContext
    ) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {

            this.logger.log(`data: ${JSON.stringify(data)}`)
            const idPartida: string = data.idPartida
            const partida: Partida = data.partida

            await this.rankingsService.processarPartida(idPartida, partida)
            await channel.ack(originalMsg)

        } catch (error) {

            const filterAckError = ackErros.filter(
                ackError => error.message.includes(ackError)
            )

            if (filterAckError.length > 0) {
                await channel.ack(originalMsg)
            }

        }
    }

    @MessagePattern(TOPICS.CONSULTAR_RANKINGS)
    async consultarRankings(

        @Payload() data: any,
        @Ctx() context: RmqContext): 
        Promise<RankingResponse[] | RankingResponse>
     {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {

            const { idCategoria, dataRef } = data

            return await this.rankingsService.consultarRankings(idCategoria, dataRef)


        } finally {

            await channel.ack(originalMsg)

        }

    }

}

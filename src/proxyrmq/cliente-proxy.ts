import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";




@Injectable()
export class ClientProxySmartRanking{
    constructor(
        private configService:ConfigService
    ){}
    private readonly logger = new Logger(ClientProxySmartRanking.name)
    getClientProxyAdminBackendInstance():ClientProxy{
        const RABBITMQ_URL =this.configService.get<string>('RABBITMQ_URL')
        const QUEUE_NAME = this.configService.get<string>('ADMIN_BACKEND')

        return ClientProxyFactory.create({
            transport:Transport.RMQ,
            options: {
                urls: [RABBITMQ_URL],
                queue: QUEUE_NAME
              }
        })
    }

    getClientProxyDesafiosInstance(): ClientProxy {
        const RABBITMQ_URL =this.configService.get<string>('RABBITMQ_URL')
        const QUEUE_NAME = this.configService.get<string>('DESAFIOS')
      
        
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [RABBITMQ_URL],
            queue: QUEUE_NAME
          }
        })
      }


      getClientProxyRankingsInstance(): ClientProxy {
      const RABBITMQ_URL =this.configService.get<string>('RABBITMQ_URL')
      const QUEUE_NAME = this.configService.get<string>('RANKINGS')
    
      
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QUEUE_NAME
        }
      })
    }

    getClientProxyNotificacoesInstance(): ClientProxy {
      const RABBITMQ_URL =this.configService.get<string>('RABBITMQ_URL')
      const QUEUE_NAME = this.configService.get<string>('NOTIFICACOES')
    
      
      return ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: QUEUE_NAME
        }
      })
    }
}



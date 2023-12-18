import { Module } from '@nestjs/common';
import { ClientProxySmartRanking } from './cliente-proxy';

@Module({
    providers: [ClientProxySmartRanking],
    exports: [ClientProxySmartRanking]
})
export class ProxyrmqModule {}

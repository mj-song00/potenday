import { Global, Module } from '@nestjs/common';
import { KalroService } from './karlo.service';

@Global()
@Module({
  providers: [KalroService],
  exports: [KalroService],
})
export class KalroModule {}

import { Module } from '@nestjs/common';
import { KalroService } from './karlo.service';

@Module({
  providers: [KalroService],
  exports: [KalroService],
})
export class KalroModule {}

import { PapagoService } from '../papgo/papago.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [PapagoService],
  exports: [PapagoService],
})
export class PapagoModule {}

import { PapagoService } from 'src/service/papgo/papago.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [PapagoService],
  exports: [PapagoService],
})
export class PapagoModule {}

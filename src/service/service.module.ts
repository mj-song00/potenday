import { PapagoModule } from './papgo/papago.module';
import { KakaoModule } from './kakao/kakao.module';
import { Module } from '@nestjs/common';
import { KalroModule } from './kalro/kalro.module';

@Module({
  imports: [KakaoModule, KalroModule, PapagoModule],
})
export class ServiceModule {}

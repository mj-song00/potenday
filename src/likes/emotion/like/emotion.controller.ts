import { ROLE } from 'src/users/user.enum';
import { Controller, Param, Post } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from 'src/entity/user.entity';
import { EmotionService } from './emotion.service';

@Controller('like')
export class likeController {
  constructor(private emotionService: EmotionService) {}
}

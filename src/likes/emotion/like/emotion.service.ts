import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Diary } from 'src/entity/diary.entity';
import { Like } from 'src/entity/like.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

Injectable();
export class EmotionService {
  constructor() {}
}

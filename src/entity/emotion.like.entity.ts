import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from 'typeorm';
import { Diary } from './diary.entity';
import { UserEntity } from './user.entity';

//일기 감정
@Entity()
// @TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Emotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  diaryId: number;

  @Column()
  emotion: string;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.emotion)
  user: UserEntity;

  @ManyToOne(() => Diary, (diaries) => diaries.emotion)
  diary: Diary;

  // 감정을 문자열에서 객체로 변환하는 메서드를 추가합니다.
  parseEmotion(): {
    좋아요: boolean;
    슬퍼요: boolean;
    괜찮아요: boolean;
    화나요: boolean;
    기뻐요: boolean;
  } {
    // 문자열로 받은 감정을 분석하여 객체로 변환합니다.
    const parsedEmotion = {
      좋아요: this.emotion.includes('좋아요'),
      슬퍼요: this.emotion.includes('슬퍼요'),
      괜찮아요: this.emotion.includes('괜찮아요'),
      화나요: this.emotion.includes('화나요'),
      기뻐요: this.emotion.includes('기뻐요'),
    };

    return parsedEmotion;
  }
}

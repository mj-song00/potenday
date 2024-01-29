import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInKakaoDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { KakaoService } from 'src/service/kakao/kakao.service';
import { JwtPayload, sign } from 'jsonwebtoken';
import { ROLE, TOKEN_TYPE } from './user.enum';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private kakaoService: KakaoService,
  ) {}

  async signInKakao(signInKakaoDto: SignInKakaoDto) {
    const { code, redirectUri } = signInKakaoDto;
    if (!code || !redirectUri) throw new Error('Bad Request');

    const { kakaoId, nickname } = await this.kakaoService.signIn(
      signInKakaoDto,
    );

    let user = await this.userRepository.findOne({
      where: { kakaoId },
    });
    let isSignUp = false;
    if (!user) {
      user = await this.createUser(kakaoId, nickname);
      isSignUp = true;
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken, isSignUp };
  }

  async createUser(kakaoId: string, nickname: string) {
    const user = this.userRepository.create({ kakaoId, nickname });
    const response = await this.userRepository.save(user);
    return response;
  }

  async createAccessToken(user: Pick<UserEntity, 'id'>): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      role: ROLE.USER,
      type: TOKEN_TYPE.ACCESS_TOKEN,
    };
    const secret = process.env.JWT_SECRET;
    const expiresIn = '2d';

    if (!secret) throw new Error();

    const accessToken: string = sign(payload, secret, { expiresIn });

    return accessToken;
  }

  async createRefreshToken(user: Pick<UserEntity, 'id'>): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      role: ROLE.USER,
      type: TOKEN_TYPE.REFRESH_TOKEN,
    };
    const secret = process.env.JWT_SECRET;
    const expiresIn = '2d';

    if (!secret) throw new Error();

    const refreshToken: string = sign(payload, secret, { expiresIn });

    return refreshToken;
  }

  async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) throw new Error();

      const id = jwt.verify(refreshToken, process.env.JWT_SECRET).sub as string;

      const user = await this.userRepository.findOne({
        where: { id },
      });

      if (!user) {
        throw new Error('존재하지 않는 고객 id를 담고 있는 토큰입니다.');
      }

      const newAccessToken = await this.createAccessToken({
        id,
      });
      const newRefreshToken = await this.createRefreshToken({
        id,
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (e) {
      const errorName = (e as Error).name;

      switch (errorName) {
        case 'TokenExpiredError':
          throw new Error('ExpiredRefreshToken');
        default:
          throw e;
      }
    }
  }

  async deleteUser(id: string) {
    await this.kakaoService.unlink(id);
    const user = await this.userRepository.delete({ id });

    return user;
  }

  async getMe(user: UserEntity) {
    const { kakaoId } = user;
    const info = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.diaries', 'diary')
      .where('user.kakaoId = kakaoId', { kakaoId })
      .getMany();

    return info;
  }
}

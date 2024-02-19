import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInKakaoDto, UpdateInfoDto } from './dto/create-user.dto';
import { UserEntity } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { KakaoService } from 'src/service/kakao/kakao.service';
import { JwtPayload, sign } from 'jsonwebtoken';
import { ROLE, TOKEN_TYPE } from './user.enum';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private kakaoService: KakaoService,
    private jwtService: JwtService,
  ) {}

  async signInKakao(signInKakaoDto: SignInKakaoDto) {
    const { code, redirectUri } = signInKakaoDto;
    if (!code || !redirectUri) throw new Error('Bad Request');

    const { kakaoId, picture } = await this.kakaoService.signIn(signInKakaoDto);

    //카카오 id로 유저 찾기
    let user = await this.userRepository.findOne({
      where: { kakaoId },
    });

    let isNewUser = true;
    if (user) {
      // 유저가 이미 존재하는 경우
      isNewUser = false;
    } else {
      // 유저가 없으면 DB에 유저 생성
      user = await this.createUser(kakaoId, picture);
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken(user);

    return { accessToken, refreshToken, isNewUser };
  }

  async createUser(kakaoId: string, picture: string) {
    const user = this.userRepository.create({ kakaoId, image: picture });

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

  async checkToken(accessToken: string): Promise<boolean> {
    if (!accessToken) return;
    try {
      const decoded = await this.jwtService.verify(accessToken, {
        secret: process.env.JWT_SECRET,
      });
      if (decoded) {
        return true;
      }
    } catch (error) {
      // 만료된 토큰인 경우 TokenExpiredError가 발생함
      if (error.name === 'TokenExpiredError') {
        return false;
      }
      // 그 외의 오류 처리
      throw error;
    }
  }

  async addInfo(infoDto: UpdateInfoDto, user: UserEntity) {
    const { gender, birth, nickname } = infoDto;
    const updateInfo = await this.userRepository.update(
      { id: user.id },
      { gender, birth, nickname },
    );
    return { result: 'sucess' };
  }

  async deleteUser(id: string) {
    await this.kakaoService.unlink(id);
    const user = await this.userRepository.delete({ id });

    return user;
  }

  async getMe(user: UserEntity) {
    const id = user.id;
    const info = await this.userRepository.findOne({ where: { id } });

    return info;
  }

  async getNickname(user: UserEntity) {
    return user.nickname;
  }

  async checkNickname(nickname: string, user: UserEntity) {
    const userWithNickname = await this.userRepository.findOne({
      where: { nickname },
    });

    if (userWithNickname) {
      throw new BadRequestException('duplication');
    } else {
      const checkedNickname = await this.userRepository.update(
        { id: user.id },
        { nickname }, // nickname이 업데이트하려는 값인 경우
      );
    }
    return { result: 'sucess' };
  }
  async logout(user: UserEntity) {
    const { kakaoId } = user;

    const logout = await this.kakaoService.unlink(kakaoId);
    logout !== user.kakaoId ? new BadRequestException() : { result: 'success' };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ConsoleLogger,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateInfoDto, SignInKakaoDto } from './dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from './user.enum';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from '../entity/user.entity';
import { info } from 'console';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //카카오 로그인
  @Post('sign-in/kakao')
  async signInKaKao(
    @Body('code') code: string,
    @Body('redirectUri') redirectUri: string,
  ) {
    const signInKakaoDto: SignInKakaoDto = {
      code,
      redirectUri,
    };
    const { accessToken, refreshToken } = await this.usersService.signInKakao(
      signInKakaoDto,
    );
    return { accessToken, refreshToken };
  }

  //리프레시 토큰
  @Get('refresh-token')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    if (!refreshToken) return;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.usersService.refreshToken(refreshToken);

    return { accessToken, refreshToken };
  }

  //유저 추가 정보
  @Patch('addInfo')
  @Roles(ROLE.USER)
  async addInfo(@Body() infoDto: UpdateInfoDto, @User() user: UserEntity) {
    return this.usersService.addInfo(infoDto, user);
  }

  //유저 삭제
  @Delete('delete/:id')
  @Roles(ROLE.USER)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  //유저 정보 불러오기
  @Get('me')
  @Roles(ROLE.USER)
  getMe(@User() user: UserEntity) {
    return this.usersService.getMe(user);
  }

  //닉네임 중복확인
  @Patch('/:nickname')
  @Roles(ROLE.USER)
  getNickname(@Param('nickname') nickname: string, @User() user: UserEntity) {
    return this.usersService.checkNickname(nickname, user);
  }
}

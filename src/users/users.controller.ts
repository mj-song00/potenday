import { FileInterceptor } from '@nestjs/platform-express';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateInfoDto, SignInKakaoDto } from './dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { ROLE } from './user.enum';
import { User } from 'src/decorators/user.decorators';
import { UserEntity } from '../entity/user.entity';

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
    const { accessToken, refreshToken, isNewUser } =
      await this.usersService.signInKakao(signInKakaoDto);

    return { accessToken, refreshToken, isNewUser };
  }

  //리프레시 토큰
  @Get('refresh-token')
  async refreshToken(@Query('refreshToken') refreshToken: string) {
    console.log(refreshToken);
    if (!refreshToken) return;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.usersService.refreshToken(refreshToken);

    return { accessToken, refreshToken };
  }

  //토큰 만료 확인
  @Post('check-tokens')
  @Roles(ROLE.USER)
  async checkTokens(
    @Query('accessToken') accessToken: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    const { accessTokenValid, refreshTokenValid } =
      await this.usersService.checkTokens(accessToken, refreshToken);

    return { accessTokenValid, refreshTokenValid };
  }

  //유저 추가 정보
  @Patch('addInfo')
  @Roles(ROLE.USER)
  async addInfo(@Body() infoDto: UpdateInfoDto, @User() user: UserEntity) {
    return this.usersService.addInfo(infoDto, user);
  }

  // 회원탈퇴 및 유저 삭제
  @Post('/unlink')
  @Roles(ROLE.USER)
  deleteUser(@User() user: UserEntity) {
    return this.usersService.deleteUser(user);
  }

  //유저 정보 불러오기(profile)
  @Get('me')
  @Roles(ROLE.USER)
  getMe(@User() user: UserEntity) {
    return this.usersService.getMe(user);
  }

  //닉네임 중복확인
  @Get('nickname')
  @Roles(ROLE.USER)
  getNickname(@Query('nickname') nickname: string) {
    return this.usersService.nicknameDuplication(nickname);
  }

  // 유저 닉네임 불러오기
  @Get()
  @Roles(ROLE.USER)
  checkNickname(@User() user: UserEntity) {
    return this.usersService.getNickname(user);
  }

  //이미지 사진 교체
  @Post('profile-image')
  @Roles(ROLE.USER)
  @UseInterceptors(FileInterceptor('imageFile'))
  changeImage(
    @User() user: UserEntity,
    @UploadedFile() imageFile: Express.Multer.File,
  ) {
    return this.usersService.changeImage(user, imageFile);
  }
}

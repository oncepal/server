import {
  Injectable,
  UnauthorizedException,
  Logger,
  Inject,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LogInDto, RegisterDto } from '@libs/dtos';
import { Prisma, User, User as UsereModel } from '@prisma/client';

@Injectable()
export class AuthService {
  @Inject()
  private userService: UserService;
  @Inject()
  private jwtService: JwtService;

  private logger = new Logger();

  async logInWithRegister(phoneNumber: string) {
    const user = await this.userService.findOneByPhoneNumber(phoneNumber);

    if (!user) {
      return await this.register(phoneNumber);
    }
    return this.generateAuthInfo(user);
  }

  async logIn(phoneNumber: string) {
    const user = await this.userService.findOneByPhoneNumber(phoneNumber);
    
    if (!user) {
      throw new UnauthorizedException('未查询到该用户');
    }
    return this.generateAuthInfo(user);
  }

  async logOut(phoneNumber: string) {
    const user = await this.userService.findOneByPhoneNumber(phoneNumber);

    if (!user) {
      throw new UnauthorizedException('未查询到该用户');
    }
     this.generateAuthInfo(user,false);
  }

  async register(phoneNumber: string) {
    const createdUser = await this.userService.create({ phoneNumber });
    if (!createdUser) {
      throw new UnauthorizedException('注册失败！');
    }
    return this.generateAuthInfo(createdUser);
  }

  async refresh(refreshToken: string) {
    const data = this.jwtService.verify(refreshToken);
    const userInfo = await this.userService.findOneById(data.userId);
    if (!userInfo) throw new UnauthorizedException('token 已失效，请重新登录');
    return this.generateAuthInfo(userInfo, false);
  }

  async generateAuthInfo(
    userInfo: UsereModel,
    isIncludingUserInfo: Boolean = true,
  ) {
    const tokens = {
      accessToken: await this.generateJwtTokens(userInfo),
      refreshToken: await this.generateJwtTokens(userInfo, true),
    };
    return {
      ...tokens,
      ...(isIncludingUserInfo ? { userInfo } : {}),
    };
  }

  async generateJwtTokens(userInfo: UsereModel, isRefresh: Boolean = false) {
    let payload;
    if (isRefresh) payload = { userId: userInfo.id };
    else payload = { userId: userInfo.id, createdAt: userInfo.createdAt };

    return this.jwtService.signAsync(payload);
  }
}

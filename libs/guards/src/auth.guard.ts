import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC } from '@libs/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject()
  private configService: ConfigService;
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException("未登录！");
    }
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException("未登录！");
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, accessToken] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? accessToken : undefined;
  }
}

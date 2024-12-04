import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Error, IS_PUBLIC } from '@libs/constants';
import { AuthService } from 'apps/main/src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);

  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

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
      this.logger.warn('Missing access token');
      throw new UnauthorizedException(Error.MISS_LONIN_ERROR);
    }

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      
      const now = Date.now() / 1000;
      const expiresIn = payload.exp - now;
      if (expiresIn < 60) { 
        const newTokens = await this.authService.refresh(accessToken);
        request['user'] = newTokens.userInfo;
        request['accessToken'] = newTokens.accessToken;
        this.logger.log('Token refreshed');
      } else {
        request['user'] = payload;
      }
    } catch (error) {
      this.logger.warn('Token verification failed', error);
      throw new UnauthorizedException(Error.MISS_LONIN_ERROR);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, accessToken] =
      (request.headers as any).authorization?.split(' ') ?? [];
    return type === 'Bearer' ? accessToken : undefined;
  }
}
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException('Pas de refresh token dans le cookie');
    }
    try {
      if (token) {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.SECRET_REFRESH_KEY,
        });
        //   console.log('payload du refresh', payload);

        request['user'] = payload;
        request['refresh_token'] = token;

        return true;
      }
    } catch (error) {
      console.log('🚀 ~ refreshGuard ~ canActivate ~ error:', error);
      throw new UnauthorizedException('Token expiré');
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['refresh_token'];
  }
}

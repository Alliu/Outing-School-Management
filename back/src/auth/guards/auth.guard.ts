import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    if (!token) {
      throw new UnauthorizedException("Pas d'access token dans le cookie");
    }
    try {
      if (token) {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: process.env.SECRET_KEY,
        });
        request['user'] = payload;
        request['access_token'] = token;
        return true;
      }
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['access_token'];
  }
}

// private extractTokenFromHeader(request: Request): string | undefined {
//   const [type, token] = request.headers.authorization?.split(' ') ?? [];
//   return type === 'Bearer' ? token : undefined;
// }

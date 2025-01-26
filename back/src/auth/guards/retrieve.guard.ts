import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class RetrieveGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromCookie(request);
    // if (!token) {
    //   console.log('pas de TOKEN !');
    //   throw new UnauthorizedException();
    // }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_REFRESH_KEY,
      });
      request['user'] = payload;
      request['refresh_token'] = token;
      return true;
    } catch (error) {
      return error;
    }
  }
  // PRIVATE Function !!!
  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.['refresh_token'];
  }
}

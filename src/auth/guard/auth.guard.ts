import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { errorMessage } from 'src/utils/response.util';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw errorMessage.invalidAuthToken;
    }

    try {
      const payload = this.jwtService.verify(token);
      // console.log(payload);
      request['user'] = payload;
      // console.log('Authenticated User:', request['user']);
    } catch (error) {
      throw errorMessage.invalidAuthToken;
    }

    return true;
  }
  extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) return undefined;

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

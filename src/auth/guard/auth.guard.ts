import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Authentication token is missing.');
    }

    console.log('Secret:', process.env.ACCESS_TOKEN_SECRET);
    console.log('Token:', token);

    try {
      console.log('Token:', token); // Log the token to see its value
      const payload = this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
      console.log('Payload:', payload); // Log the decoded payload
      request['user'] = payload;
    } catch (error) {
      console.log('Verification Error:', error.message); // Log the error message
      throw new UnauthorizedException('Invalid authentication token.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authorizationHeader = request.headers['authorization'];
    console.log('Authorization Header:', authorizationHeader); // Log the header value

    if (!authorizationHeader) return undefined;

    const [type, token] = authorizationHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}

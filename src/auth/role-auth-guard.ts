import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TokenAuthGuard } from './token-auth.guard';

@Injectable()
export class RoleGuard extends TokenAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }
}
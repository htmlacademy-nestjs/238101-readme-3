import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthorizationHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.headers['authorization'];
  }
);

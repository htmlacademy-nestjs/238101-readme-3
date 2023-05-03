import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from '../../blog-user/entities';

const USERNAME_FIELD_NAME = 'email';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: USERNAME_FIELD_NAME });
  }

  public async validate(
    email: string,
    password: string
  ): Promise<BlogUserEntity> {
    return this.authService.verifyUser({ email, password });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenPayload } from '@project/shared/shared-types';
import { AuthenticationService } from '../authentication.service';
import { TokenNotExistsException } from '../exceptions';
import { RefreshTokenService } from '../../refresh-token/refresh-token.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    const isRefreshExist = await this.refreshTokenService.isExists(
      payload.tokenId
    );

    if (!isRefreshExist) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUser(payload.id);
  }
}
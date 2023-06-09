import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity } from '../blog-user/entities';
import { BlogUserRepository } from '../blog-user/repositories';
import { AuthUserMessage } from './consts';
import { RegisterUserDto, LoginUserDto } from './dto';
import {
  ChangePasswordDto,
  RefreshTokenPayload,
  User,
} from '@project/shared/shared-types';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@project/config/config-users';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { createJWTPayload } from '@project/util/util-core';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,

    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>
  ) {}

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { currentPassword, newPassword } = dto;

    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);

    const isPasswordValid = await blogUserEntity.comparePassword(
      currentPassword
    );

    if (!isPasswordValid) {
      throw new ForbiddenException(AuthUserMessage.PasswordWrong);
    }

    const updatedBlogUserEntity = await blogUserEntity.setPassword(newPassword);

    const updatedBlogUser = await this.blogUserRepository.update(
      id,
      updatedBlogUserEntity
    );

    return updatedBlogUser;
  }

  public async register(dto: RegisterUserDto) {
    const { email, name, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserMessage.Exists);
    }

    const userEntity = new BlogUserEntity({
      avatarId: '',
      email,
      name,
      passwordHash: '',
    });

    await userEntity.setPassword(password);

    return this.blogUserRepository.create(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessage.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);

    const isPasswordValid = await blogUserEntity.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthUserMessage.PasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async createUserToken(user: User) {
    const accessTokenPayload = createJWTPayload(user);

    const refreshTokenPayload: RefreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };

    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    return {
      accessToken: await this.jwtService.signAsync(accessTokenPayload),
      refreshToken: await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn,
      }),
    };
  }
}

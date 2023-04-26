import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity } from '../blog-user/entities';
import { BlogUserRepository } from '../blog-user/repositories';
import { AuthUserErrorMessage } from './consts';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from './dto';
import { TokenPayload, User } from '@project/shared/shared-types';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  public async changePassword(dto: ChangePasswordDto) {
    const { id, currentPassword, newPassword } = dto;

    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserErrorMessage.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);

    const isPasswordValid = await blogUserEntity.comparePassword(
      currentPassword
    );

    if (!isPasswordValid) {
      throw new ForbiddenException(AuthUserErrorMessage.PasswordWrong);
    }

    const updatedBlogUserEntity = await blogUserEntity.setPassword(newPassword);

    const updatedBlogUser = await this.blogUserRepository.update(
      id,
      updatedBlogUserEntity
    );

    return updatedBlogUser;
  }

  public async register(dto: CreateUserDto) {
    const { email, name, password } = dto;

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthUserErrorMessage.Exists);
    }

    const userEntity = new BlogUserEntity({
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
      throw new NotFoundException(AuthUserErrorMessage.NotFound);
    }

    const blogUserEntity = new BlogUserEntity(existUser);

    const isPasswordValid = await blogUserEntity.comparePassword(password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthUserErrorMessage.PasswordWrong);
    }

    return blogUserEntity.toObject();
  }

  public async getUser(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserErrorMessage.NotFound);
    }

    return existUser;
  }

  public async createUserToken(user: User) {
    const { _id, name, email } = user;

    const payload: TokenPayload = {
      id: _id,
      email,
      name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}

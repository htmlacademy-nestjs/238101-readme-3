import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { BlogUserEntity } from '../blog-user/entities';
import { BlogUserMemoryRepository } from '../blog-user/repositories';
import { AuthUserErrorMessage } from './consts';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserMemoryRepository) {}

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
}

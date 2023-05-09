import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogUserRepository } from './repositories';
import { UserMessage } from './consts';
import { BlogUserEntity } from './entities';
import { User } from '@project/shared/shared-types';

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async getUsers(): Promise<User[]> {
    return this.blogUserRepository.findAll();
  }

  public async getUser(id: string): Promise<User> {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessage.NotFound);
    }

    return existUser;
  }

  public async addAvatar(userId: string, avatarId: string): Promise<User> {
    const existUser = await this.getUser(userId);

    const userEntity = new BlogUserEntity({
      email: existUser.email,
      name: existUser.name,
      passwordHash: existUser.passwordHash,
      avatarId: avatarId,
    });

    return await this.blogUserRepository.update(userId, userEntity);
  }
}

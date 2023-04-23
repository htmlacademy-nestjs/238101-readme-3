import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikesRepository } from './repositories';
import { LikeEntity } from './entites';
import { LikeMessage } from './consts';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}

  public async addLike(publicationId: number, authorId: string) {
    const existedLike = await this.findLikeByPublication(+publicationId);

    if (existedLike) {
      throw new ConflictException(LikeMessage.AlreadyExist);
    }

    const likeEntity = new LikeEntity({
      authorId,
      publicationId,
    });

    return this.likesRepository.create(likeEntity);
  }

  public async findLikeByPublication(publicationId: number) {
    return this.likesRepository.findByPublication(publicationId);
  }

  async removeLike(publicationId: number) {
    const like = await this.findLikeByPublication(publicationId);

    if (!like) {
      throw new NotFoundException(LikeMessage.NotFound);
    }

    return this.likesRepository.destroy(like.id);
  }
}

import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LikesRepository } from './repositories';
import { LikeEntity } from './entites';
import { LikeMessage } from './consts';
import { PublicationsService } from '../publications/publications.service';
import { PublicationStatus } from '@prisma/client';

@Injectable()
export class LikesService {
  constructor(
    private readonly likesRepository: LikesRepository,
    private readonly publicationsService: PublicationsService
  ) {}

  public async addLike(publicationId: number, authorId: string) {
    const existedLike = await this.findLikeByPublication(publicationId);

    if (existedLike) {
      throw new ConflictException(LikeMessage.AlreadyExist);
    }

    const publication = await this.publicationsService.findById(publicationId);

    if (publication.status !== PublicationStatus.Published) {
      throw new ForbiddenException(LikeMessage.Forbidden);
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

  async removeLike(publicationId: number, userId: string) {
    const like = await this.findLikeByPublication(publicationId);

    if (!like) {
      throw new NotFoundException(LikeMessage.NotFound);
    }

    if (like.authorId !== userId) {
      throw new ForbiddenException(LikeMessage.CantRemove);
    }

    return this.likesRepository.destroy(like.id);
  }
}

import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CommentsRepository } from './repositories';
import { CommentEntity } from './entities';
import { CommentMessage } from './consts';
import { CommentsQuery, PublicationStatus } from '@project/shared/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PublicationsService } from '../publications/publications.service';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly publicationsService: PublicationsService
  ) {}

  async createComment(dto: CreateCommentDto) {
    const publication = await this.publicationsService.findById(
      dto.publicationId
    );

    if (publication.status !== PublicationStatus.Published) {
      throw new ForbiddenException(CommentMessage.ForbiddenAdd);
    }

    const commentEntity = new CommentEntity({ ...dto, authorId: dto.userId });
    return this.commentsRepository.create(commentEntity);
  }

  async getAllComentsByPublication(
    publicationId: number,
    commentsQuery: CommentsQuery
  ) {
    return this.commentsRepository.findByPublication(
      publicationId,
      commentsQuery
    );
  }

  async getCommentById(commentId: number) {
    const comment = this.commentsRepository.findById(commentId);

    if (!comment) {
      throw new NotFoundException(CommentMessage.NotFound);
    }

    return comment;
  }

  async deleteComment(commentId: number, userId: string) {
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException(CommentMessage.NotFound);
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException(CommentMessage.ForbiddenDelete);
    }

    return this.commentsRepository.destroy(commentId);
  }
}

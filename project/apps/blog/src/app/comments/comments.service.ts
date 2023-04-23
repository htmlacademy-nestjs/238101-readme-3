import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto';
import { CommentsRepository } from './repositories';
import { CommentEntity } from './entities';
import { CommentMessage } from './consts';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({ ...dto, authorId: '123' });
    return this.commentsRepository.create(commentEntity);
  }

  async getAllComentsByPublication(publicationId: number) {
    return this.commentsRepository.findByPublication(publicationId);
  }

  async getCommentById(commentId: number) {
    return this.commentsRepository.findById(commentId);
  }

  async deleteComment(commentId: number) {
    const comment = await this.getCommentById(commentId);

    if (!comment) {
      throw new NotFoundException(CommentMessage.NotFound);
    }

    return this.commentsRepository.destroy(commentId);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto';
import { CommentsRepository } from './repositories';
import { CommentEntity } from './entities';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  createComment(dto: CreateCommentDto) {
    const commentEntity = new CommentEntity({ ...dto, authorId: '123' });
    return this.commentsRepository.create(commentEntity);
  }

  getAllComentsByPublication(publicationId: number) {
    return this.commentsRepository.findByPublication(publicationId);
  }

  getCommentById(commentId: number) {
    return this.commentsRepository.findById(commentId);
  }

  deleteComment(commentId: number) {
    return this.commentsRepository.destroy(commentId);
  }
}

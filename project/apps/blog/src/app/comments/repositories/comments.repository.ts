import { Injectable } from '@nestjs/common';
import { CommentEntity } from '../entities';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../../prisma/prisma.service';
import { Comment, CommentsQuery } from '@project/shared/shared-types';

@Injectable()
export class CommentsRepository
  implements CRUDRepository<CommentEntity, number, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public create(item: CommentEntity): Promise<Comment> {
    const entityData = item.toObject();

    return this.prisma.comment.create({
      data: {
        ...entityData,
      },
    });
  }

  public findById(id: number): Promise<Comment> {
    return this.prisma.comment.findFirst({
      where: {
        id,
      },
    });
  }

  public findByPublication(
    id: number,
    { limit, page }: CommentsQuery
  ): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        publicationId: id,
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public update(id: number, item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      data: {
        ...item.toObject(),
      },
      where: {
        id,
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id,
      },
    });
  }
}

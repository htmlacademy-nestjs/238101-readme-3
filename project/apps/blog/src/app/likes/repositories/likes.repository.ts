import { Injectable } from '@nestjs/common';
import { Like } from '@project/shared/shared-types';
import { LikeEntity } from '../entites';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: LikeEntity): Promise<Like> {
    return this.prisma.like.create({
      data: {
        ...item.toObject(),
      },
    });
  }

  public async findById(id: number): Promise<Like> {
    return this.prisma.like.findFirst({
      where: {
        id,
      },
    });
  }

  public async findByPublication(publicationId: number): Promise<Like> {
    return this.prisma.like.findFirst({
      where: {
        publicationId,
      },
    });
  }

  public async destroy(likeId: number): Promise<void> {
    await this.prisma.like.delete({
      where: {
        id: likeId,
      },
    });
  }
}

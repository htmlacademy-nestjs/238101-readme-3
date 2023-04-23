import { Injectable } from '@nestjs/common';
import { AppErrors, Like } from '@project/shared/shared-types';
import { CRUDRepository } from '@project/util/util-types';
import { LikeEntity } from '../entites';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesRepository
  implements CRUDRepository<LikeEntity, number, Like>
{
  constructor(private readonly prisma: PrismaService) {}

  public create(item: LikeEntity): Promise<Like> {
    return this.prisma.like.create({
      data: {
        ...item.toObject(),
      },
    });
  }

  public findById(id: number): Promise<Like> {
    return this.prisma.like.findFirst({
      where: {
        id,
      },
    });
  }

  public findByPublication(publicationId: number): Promise<Like> {
    return this.prisma.like.findFirst({
      where: {
        publicationId,
      },
    });
  }

  public update(): Promise<Like> {
    throw new Error(AppErrors.MethodNotImplemented);
  }

  public async destroy(likeId: number): Promise<void> {
    await this.prisma.like.delete({
      where: {
        id: likeId,
      },
    });
  }
}

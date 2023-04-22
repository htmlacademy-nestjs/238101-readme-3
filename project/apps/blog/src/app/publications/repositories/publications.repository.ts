import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PublicationEntities } from '../entities';
import { PrismaService } from '../../prisma/prisma.service';
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationsRepository
  implements CRUDRepository<PublicationEntities, number, Publication>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntities): Promise<Publication> {
    const entityData = item.toObject();

    const record = this.prisma.publication.create({
      data: {
        ...entityData,
        comments: {
          connect: [],
        },
        likes: {
          connect: [],
        },
      },
      include: {
        comments: true,
        likes: true,
      },
    });

    return record;
  }

  public async destroy(publicationId: number): Promise<void> {
    await this.prisma.publication.delete({
      where: {
        id: publicationId,
      },
    });
  }

  public async findById(postId: number): Promise<Publication | null> {
    return this.prisma.publication.findFirst({
      where: {
        id: postId,
      },
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  public findAll(): Promise<Publication[]> {
    return this.prisma.publication.findMany({
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  public update(id: number, item: PublicationEntities): Promise<Publication> {
    return this.prisma.publication.update({
      data: {
        ...item.toObject(),
      },
      where: {
        id,
      },
    });
  }
}

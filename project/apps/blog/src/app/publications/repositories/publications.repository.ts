import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PublicationEntities } from '../entities';
import { PrismaService } from '../../prisma/prisma.service';
import { Publication } from '@prisma/client';
import { PostQuery } from '../query/publication.query';
import { PublicationStatus } from '@project/shared/shared-types';
import { PublicationSortKind } from '../consts/publication.const';

@Injectable()
export class PublicationsRepository
  implements CRUDRepository<PublicationEntities, number, Publication>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: PublicationEntities): Promise<Publication> {
    const entityData = item.toObject();

    return this.prisma.publication.create({
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
        status: PublicationStatus.Published,
      },
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  public async findAll({
    authorId,
    sortingBy,
    sortKind,
    limit,
    page,
    publicationKind,
    tag,
  }: PostQuery): Promise<Publication[]> {
    return this.prisma.publication.findMany({
      where: {
        authorId,
        status: PublicationStatus.Published,
        type: publicationKind,
        tags: tag
          ? {
              hasSome: tag,
            }
          : undefined,
      },
      orderBy: {
        publishedAt:
          sortingBy === PublicationSortKind.PublishedDate
            ? sortKind
            : undefined,
        likes:
          sortingBy === PublicationSortKind.Likes
            ? {
                _count: sortKind,
              }
            : undefined,
        comments:
          sortingBy === PublicationSortKind.Comments
            ? {
                _count: sortKind,
              }
            : undefined,
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
      include: {
        comments: true,
        likes: true,
      },
    });
  }

  public async update(
    id: number,
    item: PublicationEntities
  ): Promise<Publication> {
    return this.prisma.publication.update({
      data: {
        ...item.toObject(),
        updatedAt: undefined,
      },
      where: {
        id,
      },
    });
  }

  public async getCountPublicationByUser(userId: string): Promise<number> {
    return this.prisma.publication.count({
      where: {
        authorId: userId,
      },
    });
  }

  public async findAllDrafts(userId: string): Promise<Publication[]> {
    return this.prisma.publication.findMany({
      where: {
        authorId: userId,
        status: PublicationStatus.Draft,
      },
    });
  }
}

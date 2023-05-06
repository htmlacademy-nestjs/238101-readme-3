import { Injectable, NotFoundException } from '@nestjs/common';
import {
  PublicationKind,
  PublicationStatus,
} from '@project/shared/shared-types';

import { PublicationErrorMessage } from './consts';

import {
  CreatePublicationLinkDto,
  CreatePublicationPhotoDto,
  CreatePublicationQuoteDto,
  CreatePublicationTextDto,
  CreatePublicationVideoDto,
} from './dto';

import {
  PublicationLinkEntity,
  PublicationPhotoEntity,
  PublicationQuoteEntity,
  PublicationTextEntity,
  PublicationVideoEntity,
} from './entities';

import { PublicationsRepository } from './repositories/publications.repository';
import { PostQuery } from './query/publication.query';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository
  ) {}

  async createLink(dto: CreatePublicationLinkDto) {
    const { description, link, tags } = dto;

    const publicationLink = new PublicationLinkEntity({
      description,
      link,
      status: PublicationStatus.Published,
      tags,
      type: PublicationKind.Link,
    });

    return this.publicationsRepository.create(publicationLink);
  }

  public async createPhoto(dto: CreatePublicationPhotoDto) {
    const { photo, tags } = dto;

    const publicationPhoto = new PublicationPhotoEntity({
      photo,
      status: PublicationStatus.Published,
      tags,
      type: PublicationKind.Photo,
    });

    return this.publicationsRepository.create(publicationPhoto);
  }

  public async createQuote(dto: CreatePublicationQuoteDto) {
    const { authorQuote, content, tags } = dto;

    const publicationQuote = new PublicationQuoteEntity({
      authorQuote,
      content,
      status: PublicationStatus.Published,
      tags,
      type: PublicationKind.Quote,
    });

    return this.publicationsRepository.create(publicationQuote);
  }

  public async createText(dto: CreatePublicationTextDto) {
    const { announcement, content, name, tags } = dto;

    const publicationText = new PublicationTextEntity({
      announcement,
      content,
      name,
      status: PublicationStatus.Published,
      tags,
      type: PublicationKind.Text,
    });

    return this.publicationsRepository.create(publicationText);
  }

  public async createVideo(dto: CreatePublicationVideoDto) {
    const { link, name, tags } = dto;

    const publicationVideo = new PublicationVideoEntity({
      link,
      name,
      status: PublicationStatus.Published,
      tags,
      type: PublicationKind.Video,
    });

    return this.publicationsRepository.create(publicationVideo);
  }

  public async findAll(query: PostQuery) {
    return await this.publicationsRepository.findAll(query);
  }

  public async findById(id: number) {
    const publication = await this.publicationsRepository.findById(id);

    if (!publication) {
      throw new NotFoundException(PublicationErrorMessage.NotFound);
    }

    return publication;
  }

  public async getCountPublicationByUser(userId: string) {
    return this.publicationsRepository.getCountPublicationByUser(userId);
  }
}

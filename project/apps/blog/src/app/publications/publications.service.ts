import { Injectable, NotFoundException } from '@nestjs/common';
import { PublicationStatus } from '@project/shared/shared-types';

import { PublicationErrorMessage } from './consts';

import {
  CreatePublicationLinkDto,
  CreatePublicationPhotoDto,
  CreatePublicationQuoteDto,
  CreatePublicationTextDto,
  CreatePublicationVideoDto,
  UpdatePublicationPhotoDto,
  UpdatePublicationQuoteDto,
  UpdatePublicationTextDto,
  UpdatePublicationVideoDto,
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
import { UpdatePublicationLinkDto } from './dto';
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository
  ) {}

  public async createLink(dto: CreatePublicationLinkDto) {
    const { description, link, tags } = dto;

    const publicationLink = new PublicationLinkEntity({
      description,
      link,
      status: PublicationStatus.Published,
      tags,
    });

    return this.publicationsRepository.create(publicationLink);
  }

  public async updateLink(id: number, dto: UpdatePublicationLinkDto) {
    const publicationLink = await this.findById(id);

    const publicationEntity = new PublicationLinkEntity({
      ...publicationLink,
      ...dto,
    });

    return this.publicationsRepository.update(id, publicationEntity);
  }

  public async createPhoto(dto: CreatePublicationPhotoDto) {
    const { photo, tags } = dto;

    const publication = new PublicationPhotoEntity({
      photo,
      status: PublicationStatus.Published,
      tags,
    });

    return this.publicationsRepository.create(publication);
  }

  public async updatePhoto(id: number, dto: UpdatePublicationPhotoDto) {
    const publication = await this.findById(id);

    const publicationEntity = new PublicationPhotoEntity({
      ...publication,
      ...dto,
    });

    return this.publicationsRepository.update(id, publicationEntity);
  }

  public async createQuote(dto: CreatePublicationQuoteDto) {
    const { authorQuote, content, tags } = dto;

    const publicationQuote = new PublicationQuoteEntity({
      authorQuote,
      content,
      status: PublicationStatus.Published,
      tags,
    });

    return this.publicationsRepository.create(publicationQuote);
  }

  public async updateQuote(id: number, dto: UpdatePublicationQuoteDto) {
    const publication = await this.findById(id);

    const publicationEntity = new PublicationQuoteEntity({
      ...publication,
      ...dto,
    });

    return this.publicationsRepository.update(id, publicationEntity);
  }

  public async createText(dto: CreatePublicationTextDto) {
    const { announcement, content, name, tags } = dto;

    const publicationText = new PublicationTextEntity({
      announcement,
      content,
      name,
      status: PublicationStatus.Published,
      tags,
    });

    return this.publicationsRepository.create(publicationText);
  }

  public async updateText(id: number, dto: UpdatePublicationTextDto) {
    const publication = await this.findById(id);

    const publicationEntity = new PublicationTextEntity({
      ...publication,
      ...dto,
    });

    return this.publicationsRepository.update(id, publicationEntity);
  }

  public async createVideo(dto: CreatePublicationVideoDto) {
    const { link, name, tags } = dto;

    const publicationVideo = new PublicationVideoEntity({
      link,
      name,
      status: PublicationStatus.Published,
      tags,
    });

    return this.publicationsRepository.create(publicationVideo);
  }

  public async updateVideo(id: number, dto: UpdatePublicationVideoDto) {
    const publication = await this.findById(id);

    const publicationEntity = new PublicationVideoEntity({
      ...publication,
      ...dto,
    });

    return this.publicationsRepository.update(id, publicationEntity);
  }

  public async findAll(query: PostQuery) {
    return await this.publicationsRepository.findAll(query);
  }

  public async findById(id: number): Promise<Publication> {
    const publication = await this.publicationsRepository.findById(id);

    if (!publication) {
      throw new NotFoundException(PublicationErrorMessage.NotFound);
    }

    return publication;
  }

  public async delete(id: number) {
    await this.findById(id);

    return this.publicationsRepository.destroy(id);
  }

  public async getCountPublicationByUser(userId: string) {
    return this.publicationsRepository.getCountPublicationByUser(userId);
  }
}

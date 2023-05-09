import { Injectable, NotFoundException } from '@nestjs/common';
import {
  NewPublicationQuery,
  PublicationQuery,
  PublicationRepostDto,
  PublicationStatus,
} from '@project/shared/shared-types';

import { PublicationErrorMessage } from './consts';

import {
  CreatePublicationLinkDto,
  CreatePublicationPhotoDto,
  CreatePublicationQuoteDto,
  CreatePublicationTextDto,
  CreatePublicationVideoDto,
  UpdatePublicationLinkDto,
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
import { Publication } from '@prisma/client';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly publicationsRepository: PublicationsRepository
  ) {}

  public async createLink(dto: CreatePublicationLinkDto) {
    const { description, link, tags, userId } = dto;

    const publicationLink = new PublicationLinkEntity({
      authorId: userId,
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
    const { photo, tags, userId } = dto;

    const publication = new PublicationPhotoEntity({
      authorId: userId,
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
    const { authorQuote, content, tags, userId } = dto;

    const publicationQuote = new PublicationQuoteEntity({
      authorId: userId,
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
    const { announcement, content, name, tags, userId } = dto;

    const publicationText = new PublicationTextEntity({
      authorId: userId,
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
    const { link, name, tags, userId } = dto;

    const publicationVideo = new PublicationVideoEntity({
      authorId: userId,
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

  public async findAll(query: PublicationQuery) {
    return await this.publicationsRepository.findAll(query);
  }

  public async findAllPublishedPublicationFromDate(
    newPublicationQuery: NewPublicationQuery
  ) {
    return await this.publicationsRepository.findAllPublishedPublicationFromDate(
      newPublicationQuery
    );
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

  public async repostPublication(repostDto: PublicationRepostDto) {
    const { userId } = repostDto;

    const originalPublication = await this.findById(repostDto.publicationId);

    const linkPublication = new PublicationLinkEntity({
      ...originalPublication,
      id: undefined,
      isReposted: true,
      authorId: userId,
      originalAuthorId: originalPublication.authorId,
      originalPublicationId: originalPublication.id,
    });

    return this.publicationsRepository.create(linkPublication);
  }

  public async getCountPublicationByUser(userId: string) {
    return this.publicationsRepository.getCountPublicationByUser(userId);
  }

  public async findAllDrafts(userId: string) {
    return this.publicationsRepository.findAllDrafts(userId);
  }

  public async getPublicationsBySearch(search: string) {
    return this.publicationsRepository.findAllBySearch(search);
  }
}

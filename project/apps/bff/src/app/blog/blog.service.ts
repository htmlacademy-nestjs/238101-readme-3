import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import {
  CreatePublicationBaseLinkDto,
  CreatePublicationBasePhotoDto,
  CreatePublicationBaseQuoteDto,
  CreatePublicationBaseTextDto,
  CreatePublicationBaseVideoDto,
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuoteRdo,
  PublicationTextRdo,
  PublicationVideoRdo,
  UserRdo,
} from '@project/shared/shared-types';

@Injectable()
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  private async getPublicationAuthor(authorId: string) {
    const { data } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/users/${authorId}`
    );

    return data;
  }

  public async createPublicationLink(dto: CreatePublicationBaseLinkDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationLinkRdo>(
        `${ApplicationServiceURL.Blog}/publications/link`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }

  public async createPublicationPhoto(dto: CreatePublicationBasePhotoDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationPhotoRdo>(
        `${ApplicationServiceURL.Blog}/publications/photo`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }

  public async createPublicationQuote(dto: CreatePublicationBaseQuoteDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationQuoteRdo>(
        `${ApplicationServiceURL.Blog}/publications/quote`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }

  public async createPublicationText(dto: CreatePublicationBaseTextDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationTextRdo>(
        `${ApplicationServiceURL.Blog}/publications/text`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }

  public async createPublicationVideo(dto: CreatePublicationBaseVideoDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationVideoRdo>(
        `${ApplicationServiceURL.Blog}/publications/video`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }
}

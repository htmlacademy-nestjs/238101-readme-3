import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import {
  CreatePublicationBaseLinkDto,
  PublicationLinkRdo,
  UserRdo,
} from '@project/shared/shared-types';

@Injectable()
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  public async createPublicationLink(dto: CreatePublicationBaseLinkDto) {
    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationLinkRdo>(
        `${ApplicationServiceURL.Blog}/publications/link`,
        dto
      );

    const { data: userInfo } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/users/${publication.authorId}`
    );

    return {
      publication,
      userInfo,
    };
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { CreatePublicationBaseLinkDto } from '@project/shared/shared-types';

@Injectable()
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  public async createPublicationLink(dto: CreatePublicationBaseLinkDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/publications/link`,
      dto
    );
    return data;
  }
}

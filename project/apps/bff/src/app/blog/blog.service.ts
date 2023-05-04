import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import { CreatePublicationLinkDto } from './dto';

@Injectable()
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  public async createPublicationLink(dto: CreatePublicationLinkDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Blog}/publications/link`,
      dto
    );
    return data;
  }
}

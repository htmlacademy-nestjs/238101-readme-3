import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import {
  CreatePublicationBaseLinkDto,
  CreatePublicationBaseQuoteDto,
  CreatePublicationBaseTextDto,
  CreatePublicationBaseVideoDto,
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuoteRdo,
  PublicationTextRdo,
  PublicationVideoRdo,
  StoredFile,
  UserRdo,
} from '@project/shared/shared-types';
import { BffPublicationPhotoDto } from './dto';
import FormData from 'form-data';

@Injectable()
export class BlogService {
  constructor(private readonly httpService: HttpService) {}

  private async getPublicationAuthor(authorId: string) {
    const { data } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/users/${authorId}`
    );

    return data;
  }

  private async uploadPublicationPhoto(
    photo: Express.Multer.File
  ): Promise<StoredFile | null> {
    const formData = new FormData();
    formData.append('file', photo.buffer, { filename: photo.originalname });

    const { data: uploadedPublicationPhoto } =
      await this.httpService.axiosRef.post<StoredFile>(
        `${ApplicationServiceURL.Uploader}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

    return uploadedPublicationPhoto;
  }

  private async getUploadedPhoto(fileId: string): Promise<StoredFile | null> {
    const { data: photoStoredFile } =
      await this.httpService.axiosRef.get<StoredFile>(
        `${ApplicationServiceURL.Uploader}/files/${fileId}`
      );

    if (!photoStoredFile) {
      return null;
    }

    return photoStoredFile;
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

  public async createPublicationPhoto(
    dto: Omit<BffPublicationPhotoDto, 'photo'>,
    photo: Express.Multer.File
  ) {
    const tags = dto?.tags ? JSON.parse(dto.tags) : [];

    const uploadPublicationPhoto = await this.uploadPublicationPhoto(photo);

    const { data: publication } =
      await this.httpService.axiosRef.post<PublicationPhotoRdo>(
        `${ApplicationServiceURL.Blog}/publications/photo`,
        {
          ...dto,
          tags,
          photo: uploadPublicationPhoto.id,
        }
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    const photoUploadedFile = await this.getUploadedPhoto(publication.photo);

    return {
      publication: { ...publication, photo: photoUploadedFile?.path || '' },
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

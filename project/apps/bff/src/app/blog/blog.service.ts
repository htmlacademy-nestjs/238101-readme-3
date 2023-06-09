import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ApplicationServiceURL } from '../app.config';
import {
  Comment,
  CommentDto,
  CommentRdo,
  CommentsQuery,
  CreatePublicationBaseLinkDto,
  CreatePublicationBaseQuoteDto,
  CreatePublicationBaseTextDto,
  CreatePublicationBaseVideoDto,
  DeleteCommentRdo,
  MailingRdo,
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuery,
  PublicationQuoteRdo,
  PublicationTextRdo,
  PublicationVideoRdo,
  Publications,
  StoredFile,
  UpdatePublicationBaseLinkDto,
  UpdatePublicationBaseQuoteDto,
  UpdatePublicationBaseTextDto,
  UpdatePublicationBaseVideoDto,
  UserRdo,
} from '@project/shared/shared-types';
import { BffPublicationPhotoDto } from './dto';
import FormData from 'form-data';
import { BffPublcationRepost } from './dto/publication-repost.dto';
import { UsersService } from '../users/users.service';
import { MailingMessage } from './consts/mailing.conts';
import { NotifyService } from '../notify/notify.service';
import dayjs from 'dayjs';

@Injectable()
export class BlogService {
  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly notifyService: NotifyService
  ) {}

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

  public async updatePublicationLink(
    id: number,
    dto: UpdatePublicationBaseLinkDto
  ) {
    const { data: publication } =
      await this.httpService.axiosRef.patch<PublicationLinkRdo>(
        `${ApplicationServiceURL.Blog}/publications/link/${id}`,
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

  public async updatePublicationPhoto(
    id: number,
    dto: Omit<BffPublicationPhotoDto, 'photo'>,
    photo: Express.Multer.File
  ) {
    const tags = dto?.tags ? JSON.parse(dto.tags) : [];
    const uploadPublicationPhoto = await this.uploadPublicationPhoto(photo);

    const { data: publication } =
      await this.httpService.axiosRef.patch<PublicationPhotoRdo>(
        `${ApplicationServiceURL.Blog}/publications/photo/${id}`,
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

  public async updatePublicationQuote(
    id: number,
    dto: UpdatePublicationBaseQuoteDto
  ) {
    const { data: publication } =
      await this.httpService.axiosRef.patch<PublicationQuoteRdo>(
        `${ApplicationServiceURL.Blog}/publications/quote/${id}`,
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

  public async updatePublicationText(
    id: number,
    dto: UpdatePublicationBaseTextDto
  ) {
    const { data: publication } =
      await this.httpService.axiosRef.patch<PublicationTextRdo>(
        `${ApplicationServiceURL.Blog}/publications/text/${id}`,
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

  public async updatePublicationVideo(
    id: number,
    dto: UpdatePublicationBaseVideoDto
  ) {
    const { data: publication } =
      await this.httpService.axiosRef.patch<PublicationVideoRdo>(
        `${ApplicationServiceURL.Blog}/publications/video/${id}`,
        dto
      );

    const userInfo = await this.getPublicationAuthor(publication.authorId);

    return {
      publication,
      userInfo,
    };
  }

  public async deletePublication(id: number, userId: string) {
    return this.httpService.axiosRef.delete(
      `${ApplicationServiceURL.Blog}/publications/${id}`,
      {
        headers: {
          userId,
        },
      }
    );
  }

  public async repostPublication(dto: BffPublcationRepost) {
    const { data: repostedPublication } =
      await this.httpService.axiosRef.post<Publications>(
        `${ApplicationServiceURL.Blog}/publications/repost`,
        {
          ...dto,
        }
      );

    return repostedPublication;
  }

  public async getPublicationsBySearch(search: string) {
    const { data: publications } = await this.httpService.axiosRef.get<
      Publications[]
    >(`${ApplicationServiceURL.Blog}/publications/search`, {
      params: {
        search,
      },
    });

    return publications;
  }

  public async getPublications(params: PublicationQuery) {
    const { data: publications } = await this.httpService.axiosRef.get<
      Publications[]
    >(`${ApplicationServiceURL.Blog}/publications`, {
      params,
    });

    return publications;
  }

  public async getPublicationById(publicationId: number) {
    const { data: publications } =
      await this.httpService.axiosRef.get<Publications>(
        `${ApplicationServiceURL.Blog}/publications/${publicationId}`
      );

    return publications;
  }

  public async getDrafts(userId: string) {
    const { data: publications } =
      await this.httpService.axiosRef.get<Publications>(
        `${ApplicationServiceURL.Blog}/publications/draft`,
        {
          headers: {
            userId,
          },
        }
      );

    return publications;
  }

  public async addLike(publicationId: number, userId: string) {
    const { data: like } = await this.httpService.axiosRef.post<string>(
      `${ApplicationServiceURL.Blog}/likes`,
      {
        userId,
      },
      {
        params: {
          publicationId,
        },
      }
    );

    return like;
  }

  public async removeLike(publicationId: number, userId: string) {
    const { data: deletedLike } =
      await this.httpService.axiosRef.delete<string>(
        `${ApplicationServiceURL.Blog}/likes`,
        {
          headers: {
            userId,
          },
          params: {
            publicationId,
          },
        }
      );

    return deletedLike;
  }

  public async getCommentsByPublication(
    publicationId: number,
    commentsQuery: CommentsQuery
  ) {
    const { data: comments } = await this.httpService.axiosRef.get<Comment[]>(
      `${ApplicationServiceURL.Blog}/comments/${publicationId}`,
      {
        params: commentsQuery,
      }
    );

    return comments;
  }

  public async addComment(dto: CommentDto) {
    const { data: like } = await this.httpService.axiosRef.post<CommentRdo>(
      `${ApplicationServiceURL.Blog}/comments`,
      dto
    );

    return like;
  }

  public async deleteComment(commentId: number, userId: string) {
    const { data: deletedComment } =
      await this.httpService.axiosRef.delete<DeleteCommentRdo>(
        `${ApplicationServiceURL.Blog}/comments/${commentId}`,
        {
          headers: {
            userId,
          },
        }
      );

    return deletedComment;
  }

  public async getAllPublicationsByStartWithDate(date: string) {
    const { data: publications } = await this.httpService.axiosRef.get<
      Publications[]
    >(`${ApplicationServiceURL.Blog}/publications/new`, {
      params: {
        date,
      },
    });

    return publications;
  }

  public async sendMailing() {
    const { data: lastMailing } =
      await this.httpService.axiosRef.get<MailingRdo | null>(
        `${ApplicationServiceURL.Notify}/`
      );

    const date = lastMailing?.mailingDate || dayjs().format('YYYY-MM');

    const users = await this.usersService.getAllUsers();

    const newPublications = await this.getAllPublicationsByStartWithDate(date);

    if (!newPublications.length) {
      return MailingMessage.NoNewPublications;
    }

    await this.notifyService.sendMailing({
      publications: newPublications,
      users,
    });

    return MailingMessage.Success;
  }
}

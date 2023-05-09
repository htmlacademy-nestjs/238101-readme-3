import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { LoginUserDto, RegisterUserDto } from './dto';
import FormData from 'form-data';
import { RegisteredUserRdo, UserInfoRdo } from './rdo';
import {
  ChangePasswordDto,
  StoredFile,
  UserRdo,
} from '@project/shared/shared-types';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  private async uploadAvatarUser(
    userId: string,
    avatar: Express.Multer.File | undefined
  ): Promise<StoredFile | null> {
    if (!avatar) {
      return null;
    }

    const formData = new FormData();
    formData.append('file', avatar.buffer, { filename: avatar.originalname });

    const { data: uploadedAvatarInfo } =
      await this.httpService.axiosRef.post<StoredFile>(
        `${ApplicationServiceURL.Uploader}/files/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

    await this.httpService.axiosRef.patch<UserRdo>(
      `${ApplicationServiceURL.Users}/users/${userId}/avatar`,
      {
        avatarId: uploadedAvatarInfo.id,
      }
    );

    return uploadedAvatarInfo;
  }

  public async register(
    registerUserDto: RegisterUserDto,
    avatar: Express.Multer.File | undefined
  ): Promise<RegisteredUserRdo> {
    const { data: registeredUser } =
      await this.httpService.axiosRef.post<UserRdo>(
        `${ApplicationServiceURL.Users}/auth/register`,
        registerUserDto
      );

    const uploadedAvatarInfo = await this.uploadAvatarUser(
      registeredUser.id,
      avatar
    );

    return {
      email: registeredUser.email,
      name: registeredUser.name,
      avatarPath: uploadedAvatarInfo?.path || '',
      createdAt: registeredUser.createdAt,
    };
  }

  public async login(loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/auth/login`,
      loginUserDto
    );

    return data;
  }

  public async refreshToken(authorization: string) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/auth/refresh`,
      null,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    return data;
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
    authorization: string
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/auth/change-password`,
      changePasswordDto,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    return data;
  }

  public async getUserInfo(userId: string): Promise<UserInfoRdo> {
    const { data: userInfo } = await this.httpService.axiosRef.get<UserRdo>(
      `${ApplicationServiceURL.Users}/users/${userId}`
    );

    const { data: countPublications } =
      await this.httpService.axiosRef.get<number>(
        `${ApplicationServiceURL.Blog}/publications/count/${userId}`
      );

    return {
      id: userInfo.id,
      registrationDate: userInfo.createdAt,
      countPublications: countPublications,
    };
  }

  public async getAllUsers() {
    const { data: users } = await this.httpService.axiosRef.get<UserRdo[]>(
      `${ApplicationServiceURL.Users}/users`
    );

    return users;
  }
}

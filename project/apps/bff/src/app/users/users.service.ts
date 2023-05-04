import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from '../app.config';
import { LoginUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  public async register() {
    return 'implement register logic';
  }

  public async login(loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );

    return data;
  }

  public async refreshToken(authorization: string) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: authorization,
        },
      }
    );

    return data;
  }
}

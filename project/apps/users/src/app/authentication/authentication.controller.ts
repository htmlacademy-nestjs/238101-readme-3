import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { fillObject } from '@project/util/util-core';

import { AuthenticationService } from './authentication.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { LoggedUserRdo, UserRdo } from './rdo';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const existUser = await this.authService.getUser(id);

    return fillObject(UserRdo, existUser);
  }
}

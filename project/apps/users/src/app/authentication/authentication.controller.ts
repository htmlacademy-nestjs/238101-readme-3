import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { fillObject } from '@project/util/util-core';

import { AuthenticationService } from './authentication.service';
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from './dto';
import {
  ChangePasswordFailedRdo,
  ChangePasswordSuccessfullyRdo,
  CreatedUserRdo,
  LoggedUserRdo,
  UserRdo,
} from './rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    description: 'The new user has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatedUserRdo,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    description: 'User has been successfully logged.',
    status: HttpStatus.OK,
    type: LoggedUserRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Patch('change-password')
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    description: 'password changed successfully',
    type: ChangePasswordSuccessfullyRdo,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'current password is incorrect',
    type: ChangePasswordFailedRdo,
  })
  public async changePassword(@Body() dto: ChangePasswordDto) {
    await this.authService.changePassword(dto);
  }

  @ApiResponse({
    description: 'User found',
    status: HttpStatus.OK,
    type: UserRdo,
  })
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    return fillObject(UserRdo, existUser);
  }
}

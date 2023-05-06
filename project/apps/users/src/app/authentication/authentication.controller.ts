import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { fillObject } from '@project/util/util-core';

import { AuthenticationService } from './authentication.service';
import { ChangePasswordDto, RegisterUserDto, LoginUserDto } from './dto';
import {
  ChangePasswordFailedRdo,
  ChangePasswordSuccessfullyRdo,
  LoggedUserRdo,
  TokenPair,
} from './rdo';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import {
  RequestWithTokenPayload,
  RequestWithUser,
  UserRdo,
} from '@project/shared/shared-types';
import { AuthUserMessage } from './consts';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    description: 'The new user has been successfully created.',
    status: HttpStatus.CREATED,
    type: UserRdo,
  })
  @ApiConsumes('multipart/form-data')
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  public async register(@Body() dto: RegisterUserDto) {
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
  @ApiBody({
    type: LoginUserDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const loggedUser = await this.authService.createUserToken(user);
    return fillObject(LoggedUserRdo, Object.assign(user, loggedUser));
  }

  @ApiResponse({
    description: 'Get a new access/refresh tokens',
    status: HttpStatus.OK,
    type: TokenPair,
  })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  public async changePassword(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: ChangePasswordDto
  ) {
    await this.authService.changePassword(user.id, dto);

    return fillObject(ChangePasswordSuccessfullyRdo, {
      message: AuthUserMessage.PasswordChanged,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}

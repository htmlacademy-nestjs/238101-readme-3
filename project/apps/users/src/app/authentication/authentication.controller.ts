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
import { RegisterUserDto, LoginUserDto } from './dto';
import {
  ChangePasswordFailedRdo,
  ChangePasswordSuccessfullyRdo,
  LoggedUserRdo,
  TokenPair,
} from './rdo';
import { JwtAuthGuard, JwtRefreshGuard, LocalAuthGuard } from './guards';
import {
  ChangePasswordDto,
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

  @Post('register')
  @ApiResponse({
    description: 'The new user has been successfully created.',
    status: HttpStatus.CREATED,
    type: UserRdo,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  public async register(@Body() dto: RegisterUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
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
  public async login(@Req() { user }: RequestWithUser) {
    const loggedUser = await this.authService.createUserToken(user);
    return fillObject(LoggedUserRdo, Object.assign(user, loggedUser));
  }

  @Post('refresh')
  @ApiResponse({
    description: 'Get a new access/refresh tokens',
    status: HttpStatus.OK,
    type: TokenPair,
  })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshGuard)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
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
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  public async changePassword(
    @Req() { user }: RequestWithTokenPayload,
    @Body() dto: ChangePasswordDto
  ) {
    await this.authService.changePassword(user.id, dto);

    return fillObject(ChangePasswordSuccessfullyRdo, {
      message: AuthUserMessage.PasswordChanged,
    });
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  public async checkToken(@Req() { user: payload }: RequestWithTokenPayload) {
    return payload;
  }
}

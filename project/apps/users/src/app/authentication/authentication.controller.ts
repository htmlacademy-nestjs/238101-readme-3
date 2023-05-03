import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Req,
  UploadedFile,
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
import { ChangePasswordDto, CreateUserDto, LoginUserDto } from './dto';
import {
  ChangePasswordFailedRdo,
  ChangePasswordSuccessfullyRdo,
  CreatedUserRdo,
  LoggedUserRdo,
  UserRdo,
} from './rdo';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard, LocalAuthGuard } from './guards';
import {
  RequestWithTokenPayload,
  RequestWithUser,
} from '@project/shared/shared-types';
import {
  ALLOWED_AVATAR_EXTENCION,
  AuthUserMessage,
  MAX_AVATAR_BITE_SIZE,
} from './consts';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @ApiResponse({
    description: 'The new user has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatedUserRdo,
  })
  @ApiConsumes('multipart/form-data')
  @Post('register')
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: ALLOWED_AVATAR_EXTENCION,
        })
        .addMaxSizeValidator({
          maxSize: MAX_AVATAR_BITE_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    avatar: Express.Multer.File
  ) {
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

  @ApiResponse({
    description: 'User found',
    status: HttpStatus.OK,
    type: UserRdo,
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    return fillObject(UserRdo, existUser);
  }
}

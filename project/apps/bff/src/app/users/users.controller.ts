import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { UserLimitation } from './user.const';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChangePasswordDto } from '@project/shared/shared-types';
import { AuthorizationHeader } from '@project/shared/shared-decorators';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('avatar'))
  public async register(
    @Body() registerUserDto: RegisterUserDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: UserLimitation.AllowedExtension,
        })
        .addMaxSizeValidator({
          maxSize: UserLimitation.MaxBiteSize,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        })
    )
    avatar: Express.Multer.File | undefined
  ) {
    return await this.usersService.register(registerUserDto, avatar);
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('refresh')
  @ApiBearerAuth()
  public async refreshToken(@AuthorizationHeader() token: string) {
    return this.usersService.refreshToken(token);
  }

  @Post('change-password')
  @ApiBearerAuth()
  public async changePassword(
    @AuthorizationHeader() token: string,
    @Body() changePasswordDto: ChangePasswordDto
  ) {
    return this.usersService.changePassword(changePasswordDto, token);
  }

  @Get(':id')
  public async getUserInfo(@Param('id') id: string) {
    return this.usersService.getUserInfo(id);
  }
}

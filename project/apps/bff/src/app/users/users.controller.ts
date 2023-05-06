import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { LoginUserDto, RegisterUserDto } from './dto';
import { ALLOWED_AVATAR_EXTENCION, MAX_AVATAR_BITE_SIZE } from './user.const';
import { FileInterceptor } from '@nestjs/platform-express';

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
          fileType: ALLOWED_AVATAR_EXTENCION,
        })
        .addMaxSizeValidator({
          maxSize: MAX_AVATAR_BITE_SIZE,
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
  public async refreshToken(@Req() req: Request) {
    return this.usersService.refreshToken(req.headers['authorization']);
  }
}

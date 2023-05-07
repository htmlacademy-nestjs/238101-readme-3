import {
  Body,
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { AxiosExceptionFilter } from '../filters';
import { CheckAuthGuard } from '../guards';
import { UseridInterceptor } from '../interceptors';
import {
  CreatePublicationBaseLinkDto,
  CreatePublicationBaseQuoteDto,
  CreatePublicationBaseTextDto,
  CreatePublicationBaseVideoDto,
} from '@project/shared/shared-types';
import {
  BffPublicationAuthorRdo,
  BffPublicationLinkFullInfoRdo,
  BffPublicationLinkRdo,
  BffPublicationPhotoFullInfoRdo,
  BffPublicationPhotoRdo,
  BffPublicationQuoteFullInfoRdo,
  BffPublicationQuoteRdo,
  BffPublicationTextFullInfoRdo,
  BffPublicationTextRdo,
  BffPublicationVideoFullInfoRdo,
  BffPublicationVideoRdo,
} from './rdo';
import { fillObject } from '@project/util/util-core';
import { FileInterceptor } from '@nestjs/platform-express';
import { ALLOWED_PHOTO_EXTENCION, MAX_PHOTO_BITE_SIZE } from './consts';
import { BffPublicationPhotoDto } from './dto';

@Controller('blog')
@ApiTags('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/link')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BffPublicationLinkFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationLink(
    @Body() dto: CreatePublicationBaseLinkDto
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationLink(dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationLinkRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Post('/photo')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BffPublicationPhotoFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @UseInterceptors(FileInterceptor('photo'))
  public async createPublicationPhoto(
    @Body() dto: BffPublicationPhotoDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: ALLOWED_PHOTO_EXTENCION,
        })
        .addMaxSizeValidator({
          maxSize: MAX_PHOTO_BITE_SIZE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    photo: Express.Multer.File
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationPhoto(dto, photo);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationPhotoRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Post('/quote')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BffPublicationQuoteFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationQuote(
    @Body() dto: CreatePublicationBaseQuoteDto
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationQuote(dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationQuoteRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Post('/text')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BffPublicationTextFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationText(
    @Body() dto: CreatePublicationBaseTextDto
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationText(dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationTextRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Post('/video')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: BffPublicationVideoFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationVideo(
    @Body() dto: CreatePublicationBaseVideoDto
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationVideo(dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationVideoRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }
}

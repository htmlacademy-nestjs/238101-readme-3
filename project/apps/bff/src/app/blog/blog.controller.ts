import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Patch,
  Post,
  Query,
  UploadedFile,
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
import { CheckAuthGuard } from '../guards';
import { UseridInterceptor } from '../interceptors';
import {
  CommentDto,
  CommentsQuery,
  CreatePublicationBaseLinkDto,
  CreatePublicationBaseQuoteDto,
  CreatePublicationBaseTextDto,
  CreatePublicationBaseVideoDto,
  PublicationQuery,
  UpdatePublicationBaseLinkDto,
  UpdatePublicationBaseQuoteDto,
  UpdatePublicationBaseTextDto,
  UpdatePublicationBaseVideoDto,
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
import { UserId } from '@project/shared/shared-decorators';
import { BffPublcationRepost } from './dto/publication-repost.dto';

@Controller('blog')
@ApiTags('blog')
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

  @Patch('/link/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BffPublicationLinkFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async updatePublicationLink(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationBaseLinkDto
  ) {
    const { publication, userInfo } =
      await this.blogService.updatePublicationLink(id, dto);

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

  @Patch('/photo/:id')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BffPublicationPhotoFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @UseInterceptors(FileInterceptor('photo'))
  public async updatePublicationPhoto(
    @Param('id') id: number,
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
      await this.blogService.updatePublicationPhoto(id, dto, photo);

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
  public async updatePublicationQuote(
    @Body() dto: CreatePublicationBaseQuoteDto
  ) {
    const { publication, userInfo } =
      await this.blogService.createPublicationQuote(dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationQuoteRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Patch('/quote/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BffPublicationQuoteFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationQuote(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationBaseQuoteDto
  ) {
    const { publication, userInfo } =
      await this.blogService.updatePublicationQuote(id, dto);

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

  @Patch('/text/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BffPublicationTextFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async updatePublicationText(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationBaseTextDto
  ) {
    const { publication, userInfo } =
      await this.blogService.updatePublicationText(id, dto);

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

  @Patch('/video/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: BffPublicationVideoFullInfoRdo,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async updatePublicationVideo(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationBaseVideoDto
  ) {
    const { publication, userInfo } =
      await this.blogService.updatePublicationVideo(id, dto);

    const userRdo = fillObject(BffPublicationAuthorRdo, userInfo);
    const publicationRdo = fillObject(BffPublicationVideoRdo, publication);

    return { ...publicationRdo, user: userRdo };
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async deletePublication(
    @Param('id') id: number,
    @UserId() userId: string
  ) {
    await this.blogService.deletePublication(id, userId);
    return;
  }

  @Post('repost/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async repostPublication(@Body() dto: BffPublcationRepost) {
    return this.blogService.repostPublication(dto);
  }

  @Get('publications')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async getAllPublications(@Query() publicationQuery: PublicationQuery) {
    return this.blogService.getPublications(publicationQuery);
  }

  @Get('publications/:id')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  public async getPublicationById(@Param('id') id: number) {
    return this.blogService.getPublicationById(id);
  }

  @Get('/draft')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async getDrafts(@UserId() userId: string) {
    return this.blogService.getDrafts(userId);
  }

  @Post('like/:publicationId')
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  @ApiBearerAuth()
  addLike(
    @Param('publicationId') publicationId: number,
    @UserId() userId: string
  ) {
    return this.blogService.addLike(publicationId, userId);
  }

  @Delete('like/:publicationId')
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  removeLike(
    @Param('publicationId') publicationId: number,
    @UserId() userId: string
  ) {
    return this.blogService.removeLike(publicationId, userId);
  }

  @Post('comments/:publicationId')
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  addComment(@Body() dto: CommentDto) {
    return this.blogService.addComment(dto);
  }

  @Get('comments/:publicationId')
  getCommentsByPublication(
    @Param('publicationId') publicationId: number,
    @Query() commentsQuery: CommentsQuery
  ) {
    return this.blogService.getCommentsByPublication(
      publicationId,
      commentsQuery
    );
  }

  @Delete('comments/:commentId')
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  deleteComment(
    @Param('commentId') commentId: number,
    @UserId() userId: string
  ) {
    return this.blogService.deleteComment(commentId, userId);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

import { fillObject } from '@project/util/util-core';

import {
  CreatePublicationLinkDto,
  CreatePublicationPhotoDto,
  CreatePublicationQuoteDto,
  CreatePublicationTextDto,
  CreatePublicationVideoDto,
  UpdatePublicationLinkDto,
  UpdatePublicationPhotoDto,
  UpdatePublicationQuoteDto,
  UpdatePublicationTextDto,
  UpdatePublicationVideoDto,
} from './dto';

import { PublicationsService } from './publications.service';

import {
  PublicationLinkRdo,
  PublicationPhotoRdo,
  PublicationQuoteRdo,
  PublicationRepostDto,
  PublicationTextRdo,
  PublicationVideoRdo,
} from '@project/shared/shared-types';
import { PostQuery } from './query/publication.query';
import { transformPublicationToRdo } from './helpers';
import { IsUserAuthor, IsRepostUnique } from './guards';
import { AllPublicationsSchema } from './rdo';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post('link')
  @ApiResponse({
    description: 'The new link publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationLinkRdo,
  })
  public async createLink(@Body() dto: CreatePublicationLinkDto) {
    const newPublicationLink = await this.publicationsService.createLink(dto);
    return fillObject(PublicationLinkRdo, newPublicationLink);
  }

  @Patch('link/:id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'Updated link publication',
    status: HttpStatus.OK,
    type: PublicationLinkRdo,
  })
  public async updateLink(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationLinkDto
  ) {
    const updatedPublication = await this.publicationsService.updateLink(
      id,
      dto
    );

    return fillObject(PublicationLinkRdo, updatedPublication);
  }

  @Post('photo')
  @ApiResponse({
    description: 'The new photo publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationPhotoRdo,
  })
  public async createPhoto(@Body() dto: CreatePublicationPhotoDto) {
    const newPublicationPhoto = await this.publicationsService.createPhoto(dto);

    return fillObject(PublicationPhotoRdo, newPublicationPhoto);
  }

  @Patch('photo/:id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'Updated photo publication',
    status: HttpStatus.OK,
    type: PublicationPhotoRdo,
  })
  public async updatePhoto(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationPhotoDto
  ) {
    const updatedPublication = await this.publicationsService.updatePhoto(
      id,
      dto
    );

    return fillObject(PublicationPhotoRdo, updatedPublication);
  }

  @Post('quote')
  @ApiResponse({
    description: 'The new quote publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationQuoteRdo,
  })
  public async createQuote(@Body() dto: CreatePublicationQuoteDto) {
    const newPublicationQuote = await this.publicationsService.createQuote(dto);

    return fillObject(PublicationQuoteRdo, newPublicationQuote);
  }

  @Patch('quote/:id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'Updated quote publication',
    status: HttpStatus.OK,
    type: PublicationQuoteRdo,
  })
  public async updateQuote(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationQuoteDto
  ) {
    const updatedPublication = await this.publicationsService.updateQuote(
      id,
      dto
    );

    return fillObject(PublicationQuoteRdo, updatedPublication);
  }

  @Post('text')
  @ApiResponse({
    description: 'The new text publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationTextRdo,
  })
  public async createText(@Body() dto: CreatePublicationTextDto) {
    const newPublicationText = await this.publicationsService.createText(dto);

    return fillObject(PublicationTextRdo, newPublicationText);
  }

  @Patch('text/:id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'Updated text publication',
    status: HttpStatus.OK,
    type: PublicationTextRdo,
  })
  public async updateText(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationTextDto
  ) {
    const updatedPublication = await this.publicationsService.updateText(
      id,
      dto
    );

    return fillObject(PublicationTextRdo, updatedPublication);
  }

  @Post('video')
  @ApiResponse({
    description: 'The new video publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationVideoRdo,
  })
  public async createVideo(@Body() dto: CreatePublicationVideoDto) {
    const newPublicationVideo = await this.publicationsService.createVideo(dto);

    return fillObject(PublicationVideoRdo, newPublicationVideo);
  }

  @Patch('video/:id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'Updated video publication',
    status: HttpStatus.OK,
    type: PublicationVideoRdo,
  })
  public async updateVideo(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationVideoDto
  ) {
    const updatedPublication = await this.publicationsService.updateVideo(
      id,
      dto
    );

    return fillObject(PublicationTextRdo, updatedPublication);
  }

  @Get()
  @ApiResponse({
    description: 'return all publications',
    status: HttpStatus.OK,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        oneOf: AllPublicationsSchema,
      },
    },
  })
  public async findAll(@Query() query: PostQuery) {
    const publications = await this.publicationsService.findAll(query);

    return publications.map((publication) =>
      transformPublicationToRdo(publication)
    );
  }

  @Get(':id')
  @ApiResponse({
    description: 'return one publication by id',
    status: HttpStatus.OK,
    isArray: false,
    schema: {
      type: 'object',
      oneOf: AllPublicationsSchema,
    },
  })
  public async findById(@Param('id') id: number) {
    const publication = await this.publicationsService.findById(id);
    return transformPublicationToRdo(publication);
  }

  @Delete(':id')
  @UseGuards(IsUserAuthor)
  @ApiResponse({
    description: 'publication has been removed',
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: number) {
    await this.publicationsService.delete(id);
  }

  @Post('repost')
  @ApiResponse({
    description: 'publication has been reposted',
    status: HttpStatus.CREATED,
    isArray: false,
    schema: {
      type: 'object',
      oneOf: AllPublicationsSchema,
    },
  })
  @UseGuards(IsRepostUnique)
  public async repostPublication(@Body() dto: PublicationRepostDto) {
    const repostedPublication =
      await this.publicationsService.repostPublication(dto);
    return transformPublicationToRdo(repostedPublication);
  }

  @Get('count/:userId')
  public async getCountPublicationByUser(@Param('userId') userId: string) {
    return this.publicationsService.getCountPublicationByUser(userId);
  }
}

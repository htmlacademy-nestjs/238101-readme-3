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
  CreatePublicationPhotoRdo,
  CreatePublicationQuoteRdo,
  CreatePublicationTextRdo,
  CreatePublicationVideoRdo,
  transformPublicationToRdo,
} from './rdo';
import { PostQuery } from './query/publication.query';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiResponse({
    description: 'The new link publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: PublicationLinkRdo,
  })
  @Post('link')
  async createLink(@Body() dto: CreatePublicationLinkDto) {
    const newPublicationLink = await this.publicationsService.createLink(dto);

    return fillObject(PublicationLinkRdo, newPublicationLink);
  }

  @ApiResponse({
    description: 'Updated link publication',
    status: HttpStatus.OK,
    type: PublicationLinkRdo,
  })
  @Patch('link/:id')
  async updateLink(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationLinkDto
  ) {
    const updatedPublication = await this.publicationsService.updateLink(
      id,
      dto
    );

    return fillObject(PublicationLinkRdo, updatedPublication);
  }

  @ApiResponse({
    description: 'The new photo publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatePublicationPhotoRdo,
  })
  @Post('photo')
  async createPhoto(@Body() dto: CreatePublicationPhotoDto) {
    const newPublicationPhoto = await this.publicationsService.createPhoto(dto);

    return fillObject(CreatePublicationPhotoRdo, newPublicationPhoto);
  }

  @ApiResponse({
    description: 'Updated photo publication',
    status: HttpStatus.OK,
    type: CreatePublicationPhotoRdo,
  })
  @Patch('photo/:id')
  async updatePhoto(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationPhotoDto
  ) {
    const updatedPublication = await this.publicationsService.updatePhoto(
      id,
      dto
    );

    return fillObject(CreatePublicationPhotoRdo, updatedPublication);
  }

  @ApiResponse({
    description: 'The new quote publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatePublicationQuoteRdo,
  })
  @Post('quote')
  async createQuote(@Body() dto: CreatePublicationQuoteDto) {
    const newPublicationQuote = await this.publicationsService.createQuote(dto);

    return fillObject(CreatePublicationQuoteRdo, newPublicationQuote);
  }

  @ApiResponse({
    description: 'Updated quote publication',
    status: HttpStatus.OK,
    type: CreatePublicationQuoteRdo,
  })
  @Patch('quote/:id')
  async updateQuote(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationQuoteDto
  ) {
    const updatedPublication = await this.publicationsService.updateQuote(
      id,
      dto
    );

    return fillObject(CreatePublicationQuoteRdo, updatedPublication);
  }

  @ApiResponse({
    description: 'The new text publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatePublicationTextRdo,
  })
  @Post('text')
  async createText(@Body() dto: CreatePublicationTextDto) {
    const newPublicationText = await this.publicationsService.createText(dto);

    return fillObject(CreatePublicationTextRdo, newPublicationText);
  }

  @ApiResponse({
    description: 'Updated text publication',
    status: HttpStatus.OK,
    type: CreatePublicationTextRdo,
  })
  @Patch('text/:id')
  async updateText(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationTextDto
  ) {
    const updatedPublication = await this.publicationsService.updateText(
      id,
      dto
    );

    return fillObject(CreatePublicationTextRdo, updatedPublication);
  }

  @ApiResponse({
    description: 'The new video publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatePublicationVideoRdo,
  })
  @Post('video')
  async createVideo(@Body() dto: CreatePublicationVideoDto) {
    const newPublicationVideo = await this.publicationsService.createVideo(dto);

    return fillObject(CreatePublicationVideoRdo, newPublicationVideo);
  }

  @ApiResponse({
    description: 'Updated video publication',
    status: HttpStatus.OK,
    type: CreatePublicationVideoRdo,
  })
  @Patch('video/:id')
  async updateVideo(
    @Param('id') id: number,
    @Body() dto: UpdatePublicationVideoDto
  ) {
    const updatedPublication = await this.publicationsService.updateVideo(
      id,
      dto
    );

    return fillObject(CreatePublicationTextRdo, updatedPublication);
  }

  @ApiResponse({
    description: 'return all publications',
    status: HttpStatus.OK,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(PublicationLinkRdo) },
          { $ref: getSchemaPath(CreatePublicationPhotoRdo) },
          { $ref: getSchemaPath(CreatePublicationQuoteRdo) },
          { $ref: getSchemaPath(CreatePublicationTextRdo) },
          { $ref: getSchemaPath(CreatePublicationVideoRdo) },
        ],
      },
    },
  })
  @Get()
  async findAll(@Query() query: PostQuery) {
    const publications = await this.publicationsService.findAll(query);

    return publications.map((publication) =>
      transformPublicationToRdo(publication)
    );
  }

  @ApiResponse({
    description: 'return one publication by id',
    status: HttpStatus.OK,
    isArray: false,
    schema: {
      type: 'object',
      oneOf: [
        { $ref: getSchemaPath(PublicationLinkRdo) },
        { $ref: getSchemaPath(CreatePublicationPhotoRdo) },
        { $ref: getSchemaPath(CreatePublicationQuoteRdo) },
        { $ref: getSchemaPath(CreatePublicationTextRdo) },
        { $ref: getSchemaPath(CreatePublicationVideoRdo) },
      ],
    },
  })
  @Get(':id')
  async findById(@Param('id') id: number) {
    const publication = await this.publicationsService.findById(id);
    return transformPublicationToRdo(publication);
  }

  @ApiResponse({
    description: 'publication has been removed',
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.publicationsService.delete(id);
  }

  @Get('count/:userId')
  public async getCountPublicationByUser(@Param('userId') userId: string) {
    return this.publicationsService.getCountPublicationByUser(userId);
  }
}

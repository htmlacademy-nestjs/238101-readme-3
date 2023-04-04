import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';

import { fillObject } from '@project/util/util-core';

import {
  CreatePublicationLinkDto,
  CreatePublicationPhotoDto,
  CreatePublicationQuoteDto,
  CreatePublicationTextDto,
  CreatePublicationVideoDto,
} from './dto';

import { PublicationsService } from './publications.service';

import {
  CreatePublicationLinkRdo,
  CreatePublicationPhotoRdo,
  CreatePublicationQuoteRdo,
  CreatePublicationTextRdo,
  CreatePublicationVideoRdo,
  transformPublicationToRdo,
} from './rdo';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @ApiResponse({
    description: 'The new link publication has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreatePublicationLinkRdo,
  })
  @Post('link')
  async createLink(@Body() dto: CreatePublicationLinkDto) {
    const newPublicationLink = await this.publicationsService.createLink(dto);

    return fillObject(CreatePublicationLinkRdo, newPublicationLink);
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
    description: 'return all publications',
    status: HttpStatus.OK,
    isArray: true,
    schema: {
      type: 'array',
      items: {
        oneOf: [
          { $ref: getSchemaPath(CreatePublicationLinkRdo) },
          { $ref: getSchemaPath(CreatePublicationPhotoRdo) },
          { $ref: getSchemaPath(CreatePublicationQuoteRdo) },
          { $ref: getSchemaPath(CreatePublicationTextRdo) },
          { $ref: getSchemaPath(CreatePublicationVideoRdo) },
        ],
      },
    },
  })
  @Get()
  async findAll() {
    const publications = await this.publicationsService.findAll();

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
        { $ref: getSchemaPath(CreatePublicationLinkRdo) },
        { $ref: getSchemaPath(CreatePublicationPhotoRdo) },
        { $ref: getSchemaPath(CreatePublicationQuoteRdo) },
        { $ref: getSchemaPath(CreatePublicationTextRdo) },
        { $ref: getSchemaPath(CreatePublicationVideoRdo) },
      ],
    },
  })
  @Get(':id')
  async findById(@Param('id') id: string) {
    const publication = await this.publicationsService.findById(id);
    return transformPublicationToRdo(publication);
  }
}

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { AxiosExceptionFilter } from '../filters';
import { CheckAuthGuard } from '../guards';
import { UseridInterceptor } from '../interceptors';
import { CreatePublicationBaseLinkDto } from '@project/shared/shared-types';
import {
  BffPublicationAuthorRdo,
  BffPublicationLinkFullInfoRdo,
  BffPublicationLinkRdo,
} from './dto';
import { fillObject } from '@project/util/util-core';

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
}

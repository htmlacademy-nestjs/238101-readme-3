import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { AxiosExceptionFilter } from '../filters';
import { CheckAuthGuard } from '../guards';
import { UseridInterceptor } from '../interceptors';
import { CreatePublicationLinkDto } from './dto';

@Controller('blog')
@ApiTags('blog')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/link')
  @ApiBearerAuth()
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(UseridInterceptor)
  public async createPublicationLink(@Body() dto: CreatePublicationLinkDto) {
    return this.blogService.createPublicationLink(dto);
  }
}

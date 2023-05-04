import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('blog')
@ApiTags('blog')
export class BlogController {}

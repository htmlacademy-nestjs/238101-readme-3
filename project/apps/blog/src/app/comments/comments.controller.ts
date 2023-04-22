import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateCommentDto } from './dto';
import { CreateCommentRdo } from './rdo';
import { ApiResponse } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { fillObject } from '@project/util/util-core';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiResponse({
    description: 'New comment has been successfully created.',
    status: HttpStatus.CREATED,
    type: CreateCommentRdo,
  })
  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentsService.createComment(dto);

    return fillObject(CreateCommentRdo, newComment);
  }
}

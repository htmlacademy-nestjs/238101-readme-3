import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { fillObject } from '@project/util/util-core';
import { CommentMessage } from './consts';
import {
  CommentRdo,
  CommentsQuery,
  DeleteCommentRdo,
} from '@project/shared/shared-types';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UserId } from '@project/shared/shared-decorators';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiResponse({
    description: 'New comment has been successfully created.',
    status: HttpStatus.CREATED,
    type: CommentRdo,
  })
  public async createComment(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentsService.createComment(dto);

    return fillObject(CommentRdo, newComment);
  }

  @Get(':publicationId')
  @ApiResponse({
    description: 'list of comments for publication',
    status: HttpStatus.OK,
    type: CommentRdo,
    isArray: true,
  })
  public async getAllCommentsByPublication(
    @Param('publicationId') publicationId: number,
    @Query() commentsQuery: CommentsQuery
  ) {
    const comments = await this.commentsService.getAllComentsByPublication(
      publicationId,
      commentsQuery
    );

    return comments.map((comment) => fillObject(CommentRdo, comment));
  }

  @Get(':id')
  @ApiResponse({
    description: 'comment by id',
    status: HttpStatus.OK,
    type: CommentRdo,
  })
  public async getCommentById(@Param('id') id: number) {
    const comment = await this.commentsService.getCommentById(id);

    return fillObject(CommentRdo, comment);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'comment has been removed',
    type: DeleteCommentRdo,
  })
  public async deleteComment(
    @Param('id') commentId: number,
    @UserId() userId: string
  ) {
    await this.commentsService.deleteComment(commentId, userId);

    return fillObject(DeleteCommentRdo, {
      id: commentId,
      message: CommentMessage.RemoveSuccess,
    });
  }
}

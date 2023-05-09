import { Controller, Delete, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { fillObject } from '@project/util/util-core';
import { LikeRdo, LikeRemovedRdo } from './rdo';
import { LikeMessage } from './consts';
import { UserId } from '@project/shared/shared-decorators';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiResponse({
    description: 'like added',
    type: LikeRdo,
  })
  public async addLike(
    @Query('publicationId') publicationId: number,
    @UserId() userId: string
  ) {
    const createdLike = await this.likesService.addLike(publicationId, userId);
    return fillObject(LikeRdo, createdLike);
  }

  @Delete()
  @ApiResponse({
    description: 'like removed',
    type: LikeRemovedRdo,
  })
  public async removeLike(
    @Query('publicationId') publicationId: number,
    @UserId() userId: string
  ) {
    await this.likesService.removeLike(publicationId, userId);
    return fillObject(LikeRemovedRdo, { message: LikeMessage.RemovedSuccess });
  }
}

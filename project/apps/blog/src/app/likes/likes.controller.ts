import { Controller, Delete, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikesService } from './likes.service';
import { fillObject } from '@project/util/util-core';
import { LikeRdo, LikeRemovedRdo } from './rdo';
import { LikeMessage } from './consts';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiResponse({
    description: 'like added',
    type: LikeRdo,
  })
  @Post()
  async addLike(@Query('publicationId') publicationId: number) {
    const createdLike = await this.likesService.addLike(publicationId, '123');

    return fillObject(LikeRdo, createdLike);
  }

  @ApiResponse({
    description: 'like removed',
    type: LikeRemovedRdo,
  })
  @Delete()
  async removeLike(@Query('publicationId') publicationId: number) {
    await this.likesService.removeLike(publicationId);

    return fillObject(LikeRemovedRdo, { message: LikeMessage.RemovedSuccess });
  }
}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { fillObject } from '@project/util/util-core';
import { UserAvatarDto } from './dto';
import { UserRdo } from '@project/shared/shared-types';

@Controller('users')
@ApiTags('users')
export class BlogUserController {
  constructor(private readonly blogUserService: BlogUserService) {}

  @ApiResponse({
    description: 'User found',
    status: HttpStatus.OK,
    type: UserRdo,
  })
  @Get(':id')
  public async findById(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.blogUserService.getUser(id);

    return fillObject(UserRdo, existUser);
  }

  @Patch(':id/avatar')
  public async addUserAvatar(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: UserAvatarDto
  ) {
    const updatedUser = this.blogUserService.addAvatar(id, dto.avatarId);
    return fillObject(UserRdo, updatedUser);
  }
}

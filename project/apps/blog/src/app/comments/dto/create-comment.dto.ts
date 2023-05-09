import { IntersectionType } from '@nestjs/swagger';
import { CommentDto, DtoWithUserId } from '@project/shared/shared-types';

export class CreateCommentDto extends IntersectionType(
  DtoWithUserId,
  CommentDto
) {}

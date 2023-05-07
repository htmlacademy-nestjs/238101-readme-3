import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class PublicationBaseWithUserId {
  @ApiProperty({
    description: 'user id',
    example: '645658836c6966da062f5c16',
  })
  @IsMongoId()
  userId: string;
}

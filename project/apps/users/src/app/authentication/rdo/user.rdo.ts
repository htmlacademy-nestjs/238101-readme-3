import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'User id',
    example: '3a324a11-de87-4e95-91be-98ecca5f5f86',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'registration date',
    example: '2023-04-04T18:44:42.931Z',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'last update date',
    example: '2023-04-04T18:44:42.931Z',
  })
  @Expose()
  public updatedAt: string;
}

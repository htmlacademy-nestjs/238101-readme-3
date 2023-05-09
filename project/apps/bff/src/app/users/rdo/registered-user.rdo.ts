import { ApiProperty } from '@nestjs/swagger';

export class RegisteredUserRdo {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  public name: string;

  @ApiProperty({
    description: 'avatar path',
    example: '/static/2023/05/06cdf233-c22c-40c2-a60f-d49354d5dd9c.png',
  })
  public avatarPath?: string;

  @ApiProperty({
    description: 'registration date',
    example: '2023-04-23T15:47:19.801Z',
  })
  public createdAt: string;
}

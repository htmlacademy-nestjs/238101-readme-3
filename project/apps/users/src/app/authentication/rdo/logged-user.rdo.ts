import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { TokenPair } from './token-pair.rdo';

export class LoggedUserRdo extends TokenPair {
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
}

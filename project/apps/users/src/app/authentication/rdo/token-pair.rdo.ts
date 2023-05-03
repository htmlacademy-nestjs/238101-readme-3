import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenPair {
  @ApiProperty({
    description: 'JWT access token',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'JWT refresh token',
  })
  @Expose()
  public refreshToken: string;
}

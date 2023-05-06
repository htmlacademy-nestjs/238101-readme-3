import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserAvatarDto {
  @ApiProperty({
    description: 'user avatar id',
    example: '64561d7ea90af317128ea35e',
  })
  @IsString()
  avatarId: string;
}

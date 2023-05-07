import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'current password',
    example: '123456',
    required: true,
  })
  currentPassword: string;

  @ApiProperty({
    description: 'new password',
    example: '654321',
    required: true,
  })
  @MinLength(6)
  @MaxLength(12)
  newPassword: string;
}

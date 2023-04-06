import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'user id',
    example: '642c701ae33e6d147a50c9e0',
    required: true,
  })
  id: string;

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
  newPassword: string;
}

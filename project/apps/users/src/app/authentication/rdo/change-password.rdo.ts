import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChangePasswordSuccessfullyRdo {
  @ApiProperty({
    description: 'message that password changed successfully',
    example: 'password changed successfully',
  })
  @Expose()
  message: string;
}

export class ChangePasswordFailedRdo {
  @ApiProperty({
    description: 'message that current password is incorrect',
    example: 'current password is incorrect',
  })
  @Expose()
  message: string;
}

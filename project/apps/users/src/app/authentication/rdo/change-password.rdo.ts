import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AuthUserMessage } from '../consts';

export class ChangePasswordSuccessfullyRdo {
  @ApiProperty({
    example: AuthUserMessage.PasswordChanged,
  })
  @Expose()
  message: string;
}

export class ChangePasswordFailedRdo {
  @ApiProperty({
    example: AuthUserMessage.PasswordWrong,
  })
  @Expose()
  message: string;
}

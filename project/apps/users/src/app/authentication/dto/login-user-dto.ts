import { ApiProperty } from '@nestjs/swagger';
import { AuthUserErrorMessage } from '../consts';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthUserErrorMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

const EMAIL_NOT_VALID = 'Email is not valid';

export class LoginUserDto {
  @ApiProperty({
    description: 'User uniq email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  public password: string;
}

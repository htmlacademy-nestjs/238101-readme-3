import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { AuthUserMessage } from '../consts';

export class RegisterUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AuthUserMessage.EmailNotValid })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  public name: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;
}

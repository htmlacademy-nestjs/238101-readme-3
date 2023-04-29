import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { PublicationErrorMessage } from '../consts';
import { PublicationBaseDto } from './publication-base.dto';

export class CreatePublicationVideoDto extends PublicationBaseDto {
  @ApiProperty({
    description: 'Video link on youtube',
    example: 'https://youtube.com',
  })
  @IsUrl(
    { host_whitelist: ['https://youtube.com'] },
    { message: PublicationErrorMessage.UrlNotValid }
  )
  link: string;

  @ApiProperty({
    description: 'name of publication',
    example: 'Funny video',
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  name: string;
}

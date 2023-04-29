import { ApiProperty } from '@nestjs/swagger';
import { PublicationBaseDto } from './publication-base.dto';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { PublicationErrorMessage } from '../consts';

export class CreatePublicationLinkDto extends PublicationBaseDto {
  @ApiProperty({
    description: 'name of publication',
    example: 'important link',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description: string;

  @ApiProperty({
    description: 'link to something',
    example: 'https://google.com',
  })
  @IsUrl({}, { message: PublicationErrorMessage.UrlNotValid })
  link: string;
}

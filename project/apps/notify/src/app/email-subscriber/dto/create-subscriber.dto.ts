import { IsEmail, IsNotEmpty } from 'class-validator';
import { EmailSubscriberMessage } from '../consts';

export class CreateSubscriberDto {
  @IsEmail({}, { message: EmailSubscriberMessage.EmailNotValid })
  public email: string;

  @IsNotEmpty({ message: EmailSubscriberMessage.NameIsEmpty })
  public name: string;
}

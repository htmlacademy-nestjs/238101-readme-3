import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Mailing } from '@project/shared/shared-types';

@Schema({
  collection: 'email-mailing',
  timestamps: true,
})
export class EmailMailingModel extends Document implements Mailing {
  @Prop()
  public mailingDate: string;
}

export const EmailMailingSchema =
  SchemaFactory.createForClass(EmailMailingModel);

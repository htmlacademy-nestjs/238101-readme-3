import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Subscriber } from '@project/shared/shared-types';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop()
  public email: string;

  @Prop()
  public name: string;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);

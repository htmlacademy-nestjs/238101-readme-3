import { Types } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { MongoidValidationPipeMessage } from './mongoid-validation.const';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(MongoidValidationPipeMessage.NotParams);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MongoidValidationPipeMessage.BadId);
    }

    return value;
  }
}

import { Types } from 'mongoose';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  Paramtype,
  PipeTransform,
} from '@nestjs/common';
import { MongoidValidationPipeMessage } from './mongoid-validation.const';

const MONGO_VALIDATION_PARAM_TYPE: Paramtype = 'param';

@Injectable()
export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== MONGO_VALIDATION_PARAM_TYPE) {
      throw new Error(MongoidValidationPipeMessage.NotParams);
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(MongoidValidationPipeMessage.BadId);
    }

    return value;
  }
}

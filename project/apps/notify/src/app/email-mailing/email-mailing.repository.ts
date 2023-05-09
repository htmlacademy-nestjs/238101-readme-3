import { CRUDRepository } from '@project/util/util-types';
import { EmailMailingEntity } from './email-mailing.entity';
import { Mailing } from '@project/shared/shared-types';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EmailMailingModel } from './email-mailing.model';
import { Model } from 'mongoose';

@Injectable()
export class EmailMailingRepository
  implements CRUDRepository<EmailMailingEntity, string, Mailing>
{
  constructor(
    @InjectModel(EmailMailingModel.name)
    private readonly emailMailingModel: Model<EmailMailingModel>
  ) {}

  public async create(item: EmailMailingEntity): Promise<Mailing> {
    const newEmailSubscriber = new this.emailMailingModel(item);
    return newEmailSubscriber.save();
  }

  public async destroy(id: string): Promise<void> {
    this.emailMailingModel.deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<Mailing | null> {
    return this.emailMailingModel.findOne({ _id: id }).exec();
  }

  public async update(id: string, item: EmailMailingEntity): Promise<Mailing> {
    return this.emailMailingModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }

  public async findLast() {
    return this.emailMailingModel.findOne().sort({ _id: -1 });
  }
}

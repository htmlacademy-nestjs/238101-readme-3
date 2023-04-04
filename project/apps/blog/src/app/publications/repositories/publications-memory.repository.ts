import { Injectable } from '@nestjs/common';
import { Publications } from '@project/shared/shared-types';
import { CRUDRepository } from '@project/util/util-types';
import { randomUUID } from 'crypto';

import dayjs from 'dayjs';
import { PublicationEntities } from '../entities';

@Injectable()
export class PublicationsMemoryRepository
  implements CRUDRepository<PublicationEntities, string, Publications>
{
  private repository: { [key: string]: Publications } = {};

  public async create(item: PublicationEntities): Promise<Publications> {
    const entry = {
      ...item.toObject(),
      _id: randomUUID(),
      createdAt: dayjs().unix(),
      updatedAt: dayjs().unix(),
    };

    this.repository[entry._id] = entry;

    return entry;
  }

  public async findAll(): Promise<Publications[]> {
    return Object.values(this.repository);
  }

  public async findById(id: string): Promise<Publications> {
    if (!this.repository[id]) {
      return null;
    }

    return { ...this.repository[id] };
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(
    id: string,
    item: PublicationEntities
  ): Promise<Publications> {
    this.repository[id] = {
      ...item.toObject(),
      _id: id,
    };

    return this.findById(id);
  }
}

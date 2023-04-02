import { Entity, User } from '@project/shared/shared-types';
import { compare, genSalt, hash } from 'bcrypt';

const SALT_ROUNDS = 10;

export class BlogUserEntity implements User, Entity<User> {
  public _id: string;
  public avatar?: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.avatar = blogUser.avatar;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public toObject() {
    return { ...this };
  }
}

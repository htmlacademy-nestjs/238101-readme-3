import { User } from '@project/shared/shared-types';

export class BlogUserEntity implements User {
  public _id: string;
  public avatar?: string;
  public email: string;
  public name: string;
  public passwordHash: string;

  constructor(blogUser: User) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(blogUser: User) {
    this._id = blogUser._id;
    this.avatar = blogUser.avatar;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
  }
}

export interface User {
  _id?: string;

  avatar?: string;
  email: string;
  name: string;
  passwordHash: string;
}

import { User } from './User';
import { TokenPayload } from './token-payload.interface';

export interface RequestWithUser {
  user?: User;
}

export interface RequestWithTokenPayload {
  user?: TokenPayload;
}

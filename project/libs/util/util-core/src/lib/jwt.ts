import { TokenPayload, User } from '@project/shared/shared-types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    id: user._id,
    email: user.email,
    name: user.name,
  };
}

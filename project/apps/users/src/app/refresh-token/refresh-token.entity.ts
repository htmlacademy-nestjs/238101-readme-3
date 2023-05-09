import { Entity, Token } from '@project/shared/shared-types';

export class RefreshTokenEntity implements Entity<Token>, Token {
  public id: string;

  public tokenId: string;
  public userId: string;

  public createdAt: Date;
  public expiresIn: Date;

  constructor(refreshToken: Token) {
    this.createdAt = new Date();
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.id = entity.id;

    this.tokenId = entity.tokenId;
    this.userId = entity.userId;

    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toObject(): RefreshTokenEntity {
    return { ...this };
  }
}

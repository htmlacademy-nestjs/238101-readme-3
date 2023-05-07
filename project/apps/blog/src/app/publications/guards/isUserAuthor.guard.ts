import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { PublicationsService } from '../publications.service';

@Injectable()
export class CheckIsUserAuthor implements CanActivate {
  constructor(private readonly publicationsService: PublicationsService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const publicationId = parseInt(request.params['id'], 10);
    const userId = request.headers['userid'] || request.body['userId'];

    const publication = await this.publicationsService.findById(publicationId);

    if (userId !== publication.authorId) {
      return false;
    }

    return true;
  }
}

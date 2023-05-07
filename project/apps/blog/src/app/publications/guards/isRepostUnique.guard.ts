import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PublicationsService } from '../publications.service';

@Injectable()
export class IsRepostUnique implements CanActivate {
  constructor(private readonly publicationsService: PublicationsService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const publicationId = parseInt(request.body['publicationId'], 10);
    const userId = request.headers['userid'] || request.body['userId'];

    const targetPublication = await this.publicationsService.findById(
      publicationId
    );

    if (userId === targetPublication.authorId) {
      throw new ForbiddenException('author cant repost his publication');
    }

    const allUsersPublications =
      await this.publicationsService.findAllPublicationsByAuthor(userId);

    const isAlreadyReposted = allUsersPublications.find(
      (publication) =>
        publication.originalPublicationId === targetPublication.id
    );

    if (isAlreadyReposted) {
      throw new ForbiddenException('already reposted');
    }

    return true;
  }
}

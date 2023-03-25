import { Injectable } from '@nestjs/common';
import { BlogUserMemoryRepository } from '../blog-user/repositories';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserMemoryRepository) {}
}

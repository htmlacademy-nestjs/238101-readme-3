import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AxiosExceptionFilter } from '../filters';
import { LoginUserDto } from './dto';

@Controller('users')
@ApiTags('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  public async register() {
    return this.usersService.register();
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Post('refresh')
  @ApiBearerAuth()
  public async refreshToken(@Req() req: Request) {
    return this.usersService.refreshToken(req.headers['authorization']);
  }
}

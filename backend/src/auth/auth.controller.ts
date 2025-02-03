import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';  // Assurez-vous d'importer Request
import { UserEntity } from './entities/user.entity';
import { AuthEntityDto } from 'src/dto/auth.entity.dto';
import { AuthService } from './auth.service';
import { loginCredentialsDto } from 'src/dto/login.credentials.dto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  register(@Body() userData: AuthEntityDto): Promise<Partial<UserEntity>> {
    return this.authService.register(userData);
  }

  @Post('login')
  login(@Body() credentials: loginCredentialsDto) {
    return this.authService.login(credentials);
  }

  @Get()
  findAllUsers(): Promise<UserEntity[]> {
    return this.authService.FindAllUsers();
  }

  @UseGuards(JwtAuthGuard) // Protège cette route en vérifiant le JWT
  @Get('profile')
  getProfile(@Request() req): any {
    // Ici, req.user contient l'utilisateur validé par la stratégie JWT
    return req.user; // Vous renvoyez l'utilisateur validé
  }
}

import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Response,
  HttpStatus,
} from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Response() response, @Request() request) {
    try {
      const result = await this.authService.login(request.user);
      return response.status(HttpStatus.ACCEPTED).json({
        success: true,
        message: 'Login successful',
        data: { ...result, user: request.user },
      });
    } catch (error) {
      console.log(error);
      return response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Wrong Username/Password. Please try again',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

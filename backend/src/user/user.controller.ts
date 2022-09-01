import { Next, Controller, HttpStatus, Get, Req, Res } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(@Res() response, @Req() request, @Next() next) {
    const results = await this.userService.findAll();
    return response.status(HttpStatus.OK).json({
      results,
    });
  }
}

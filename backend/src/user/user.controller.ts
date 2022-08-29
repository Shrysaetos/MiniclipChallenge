import { Body, Controller, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}

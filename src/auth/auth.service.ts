import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const validatePass = await bcryptjs.compare(pass, user.password);

    if (user && validatePass) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const {password, ...result } = user._doc;
    return {
      // user: result,
      access_token: this.jwtService.sign(result),
    };
  }
}
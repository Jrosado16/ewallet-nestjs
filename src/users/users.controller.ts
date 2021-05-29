import { Controller, Get, UseGuards, Request, Body, Post } from '@nestjs/common';
import { UsersDTO } from './dto/users.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const user = await this.usersService.findByEmail(req.user.email)
        return user;
    }

    @Post('/create')
    async createUser(@Body() createUserDTO: UsersDTO){
        const user = await this.usersService.createUser(createUserDTO);
        return user;
    }
}



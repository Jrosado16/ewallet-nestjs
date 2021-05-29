import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs';
import { Model } from 'mongoose';
import { UsersDTO } from './dto/users.dto';
import { iUsers } from './interfaces/users.interfaces';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
		@InjectModel('users') private userModel: Model<iUsers>
	){}
  //find user by email
  async findByEmail(email: string){
    const user = await this.userModel.findOne({email: email});
    return user;
  }

  //create new user
  async createUser(createUserDTO: UsersDTO){
    const salt = await bcryptjs.genSalt(10);
    createUserDTO.password = await bcryptjs.hash(createUserDTO.password, salt);
    const user = new this.userModel(createUserDTO);
  
    const findUser = await this.findByEmail(createUserDTO.email);
    if(!findUser){
      const newUser = await user.save();
      return newUser;
    }
    throw new NotFoundException('mail already exists')
  }

}

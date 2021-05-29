import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { iUsers } from 'src/users/interfaces/users.interfaces';
import { RecordDTO } from './dto/record.dto';
import { iRecord } from './interfaces/record.interface';

@Injectable()
export class RecordService {
    constructor(
       @InjectModel('record') private recordModel: Model<iRecord>,
       @InjectModel('users') private usersModel: Model<iUsers>
    ){}

    async getRecord(user){
        const { email } = user;
        const record = await this.recordModel.find({accreditedUser: email, 
            // userReceived: email
        })
        return record
    }
    async getRecordReceived(user){
        const { email } = user;
        const record = await this.recordModel.find({
            // accreditedUser: email, 
            userReceived: email
        })
        return record
    }

    async createTransfer(user, recordDTO: RecordDTO){
        const { email, balance } = user;
        const accreditedUser = await this.usersModel.findOne({email: email})
        console.log(accreditedUser);
        const record = new this.recordModel(recordDTO)
        console.log(accreditedUser.balance, recordDTO.amount)
        if(accreditedUser.balance >= recordDTO.amount){
            record.accreditedUser = email;
            
            //recived
            const userRecive = await this.usersModel.findOneAndUpdate(
                {email: recordDTO.userReceived},
                {$inc: {balance: recordDTO.amount}},
                {new: true}
            )
            if(!userRecive){
                throw new NotFoundException('User not Found')
            }
            //acredito
            await this.usersModel.findOneAndUpdate(
                {email: email},
                {$inc: {balance: -recordDTO.amount}},
                {new: true}
            )
            // console.log(acreditUser)

            return await record.save()
        }else{
            throw new NotFoundException('Insufficient Balance')
        }

    }

    async removeBalance(user, amount: number){
        const { email, balance } = user;
        const newUser = await this.usersModel.findOne({email: email})

        if(newUser.balance >= amount){
            const user = await this.usersModel.findOneAndUpdate(
                {email: email},
                {$inc: {balance: -amount}},
                {new: true}
            )
            return user
        }else{
            throw new NotFoundException('Insufficient Balance')
        }
    }

    async addBalance(user, amount: number){
        const { email, balance } = user;
        // if(balance >= amount){
        const newBalance = await this.usersModel.findOneAndUpdate(
            {email: email},
            {$inc: {balance: amount}},
            {new: true}
        )
        return newBalance
        // }else{
            // throw new NotFoundException('Insufficient Balance')
        // }
    }
}

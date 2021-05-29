import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { RecordController } from './record.controller';
import { RecordService } from './record.service';
import { recordSchema } from './schema/record.schema';
import { userSchema } from '../users/schema/users.schema';

@Module({
  imports:[
    // UsersModule,
    MongooseModule.forFeature([{ name: 'record', schema: recordSchema }]),
    MongooseModule.forFeature([{ name: 'users', schema: userSchema }])
  ],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { URLDB } from './config/config';
import { RecordModule } from './record/record.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    MongooseModule.forRoot(URLDB,{
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    RecordModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

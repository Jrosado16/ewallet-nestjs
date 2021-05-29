import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { iMailData} from './interfaces/mail.interface'


@Injectable()
export class MailService {
    constructor(private mailerService: MailerService){}

    async sendEmail(emailData: iMailData) {
      const { name, description, email, subject} = emailData;
      // console.log()
      console.log(emailData);
        try {
          const mail = await this.mailerService.sendMail({
            to: email,
            cc: 'krlos_1594@yahoo.com', // send me email
            subject,
            template: './confirmation',
            context: {
              name,
              description,
              email,
            },
          });
            return mail;
        } catch (error) {
          console.log(error);
        }
      }
}

import { Body, Controller, HttpStatus, Post, Response } from '@nestjs/common';
import { iMailData } from './interfaces/mail.interface';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(private mailService: MailService){}


    @Post('/contact')
    async contactMail(@Response() res, @Body() body: iMailData){
        const mail = await this.mailService.sendEmail(body);
        if(mail){
            res.status(HttpStatus.OK).json({
                ok: true,
                message: mail
            })
        }
        res.status(HttpStatus.BAD_REQUEST).json({
            ok: false,
            message: mail
        })
    }
}

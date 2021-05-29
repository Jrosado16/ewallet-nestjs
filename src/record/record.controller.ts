import { Controller, Post, UseGuards, Request, Get, Body, Response, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecordDTO } from './dto/record.dto';
import { RecordService } from './record.service';

@Controller('record')
export class RecordController {
    constructor(private readonly recordService: RecordService){}

    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getRecord(@Request() req){
        const record = await this.recordService.getRecord(req.user)
        return record
        
    }

    @UseGuards(JwtAuthGuard)
    @Get('/received')
    async getRecordReceived(@Request() req){
        const record = await this.recordService.getRecordReceived(req.user)
        return record
        
    }

    @UseGuards(JwtAuthGuard)
    @Post('/transfer')
    async createTransfer(@Response() res, @Request() req, @Body() record: RecordDTO){
        const trsf = await this.recordService.createTransfer(req.user, record)
        console.log(trsf)
        
        if(!trsf){
            console.log('aqui')
            res.status(HttpStatus.NOT_FOUND).json({
                trsf
            })
        }
        res.status(HttpStatus.OK).json({
            trsf
        })
    }

    @UseGuards(JwtAuthGuard)
    @Post('/remove')
    async removeBalance(@Request() req, @Body() body){
        const { amount } = body;
        console.log(amount)

        const user = await this.recordService.removeBalance(req.user, amount)
        return user;

    }
    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async addBalance(@Request() req, @Body() body){
        console.log(body)
        const { amount } = body;
        const user = await this.recordService.addBalance(req.user, amount)
        return user;
    }
}

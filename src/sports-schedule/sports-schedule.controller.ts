import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SportsScheduleService } from './sports-schedule.service';
import { CreateScheduleDto } from '../user/dto/create-schedule.dto';

@Controller('api/sport_schedule')
export class SportsScheduleController {
  constructor(private readonly sportsScheduleService: SportsScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createScheduleDto: CreateScheduleDto) {
    return this.sportsScheduleService.create(createScheduleDto);
  }
}

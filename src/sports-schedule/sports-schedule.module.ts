import { Module } from '@nestjs/common';
import { SportsScheduleService } from './sports-schedule.service';
import { SportsScheduleController } from './sports-schedule.controller';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [SportsScheduleService, PrismaService],
  controllers: [SportsScheduleController],
})
export class SportsScheduleModule {}

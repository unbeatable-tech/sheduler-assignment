import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SportsScheduleModule } from './sports-schedule/sports-schedule.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UserModule, SportsScheduleModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})

export class AppModule {}

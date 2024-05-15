import { Injectable, HttpException, HttpStatus, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateScheduleDto } from '../user/dto/create-schedule.dto';
import { isBefore, isAfter, format, sub } from 'date-fns';
import { subtractTime } from '../utils/common'
import { validateCreateScheduleDto } from '../utils/validation';


@Injectable()
export class SportsScheduleService {
    constructor(private prisma: PrismaService) { }

    async create(createScheduleDto: CreateScheduleDto) {
        const validationError = validateCreateScheduleDto(createScheduleDto);
        if (validationError) {
            throw new HttpException(validationError, HttpStatus.BAD_REQUEST);
        }
        const { name, startTime, endTime, date } = createScheduleDto;
        const formattedDate = new Date(date);

        // Find existing schedules for the given date
        const existingSchedules = await this.prisma.sportSchedule.findMany({
            where: {
                date: formattedDate,
            },
        });

        for (const existingSchedule of existingSchedules) {
            const existingStartTime = existingSchedule.startTime;
            const existingEndTime = existingSchedule.endTime;

            // If the new schedule overlaps with an existing one
            if (isBefore(startTime, existingEndTime) && isAfter(endTime, existingStartTime)) {
                // Adjust the new schedule's end time to the start time of the existing one


                let checkExistingEntry = await this.prisma.sportSchedule.findMany({
                    where: {
                        name: createScheduleDto.name,
                        OR: [
                            { startTime: { gte: createScheduleDto.startTime } },
                            { endTime: { lte: createScheduleDto.endTime } }
                        ]
                    }
                })

                if (checkExistingEntry?.length > 0) {
                    return `The time slot from ${subtractTime(checkExistingEntry[0].endTime)} to ${subtractTime(endTime)} is already booked for ${existingSchedule.name}.`
                }

                await this.prisma.sportSchedule.create({
                    data: {
                        name,
                        startTime: createScheduleDto.startTime,
                        endTime: existingSchedule.startTime,
                        date: formattedDate,
                    },
                });
                return `The time slot from ${subtractTime(existingSchedule.startTime)} to ${subtractTime(endTime)} is already booked for ${existingSchedule.name}.`
            }

        }

        // Create the new schedule
        const storedSchedule = await this.prisma.sportSchedule.create({
            data: {
                name,
                startTime: createScheduleDto.startTime,
                endTime: createScheduleDto.endTime,
                date: formattedDate,
            },
        });

        return {
            status: 'success',
            message: 'Slot booked successfully.',
            schedule: {
                id: storedSchedule.id,
                name: storedSchedule.name,
                startTime: storedSchedule.startTime,
                endTime: storedSchedule.endTime,
                date: storedSchedule.date,
            },
        }
    }
}

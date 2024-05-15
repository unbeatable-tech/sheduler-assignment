import { CreateScheduleDto } from '../user/dto/create-schedule.dto';
import { CreateUserDto } from '../user/dto/create-user.dto'
export function validateCreateScheduleDto(createScheduleDto: CreateScheduleDto): string | null {
    const { name, startTime, endTime, date } = createScheduleDto;

    if (!name || name.trim() === '') {
        return 'Please enter the name';
    }
    if (!startTime) {
        return 'Please enter a valid startTime';
    }
    if (!endTime) {
        return 'Please enter a valid endTime';
    }
    if (startTime === endTime) {
        return 'Start time and end time cannot be equal';
    }
    if (!date) {
        return 'Please enter a valid date';
    }

    return null;
}
export function validateLoginCredentials(email: string, password: string): string | null {
    if (!email || email.trim() === '') {
        return 'Please enter a valid email';
    }
    if (!password || password.trim() === '') {
        return 'Please enter a valid password';
    }
    return null;
}
export function validateCreateUser(createUserDto: CreateUserDto): string | null {
    const { fullName, email, password } = createUserDto;
    if (!fullName || fullName.trim() === '') {
        return 'Please enter a valid fullName';
    }
    if (!email || email.trim() === '') {
        return 'Please enter a valid email';
    }
    if (!password || password.trim() === '') {
        return 'Please enter a valid password';
    }
    return null;
}
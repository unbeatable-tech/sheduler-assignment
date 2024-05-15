import { sub, format } from 'date-fns';

export function subtractTime(time: Date): string {
    const adjustedTime = sub(time, {
        hours: 5,
        minutes: 30
    });

    return format(adjustedTime, 'HH:mm');
} 
export function durationToNumber(value: string) {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
}

export function numberToDuration(duration: number) {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    const hoursString = String(hours).padStart(1, '0');
    const minutesString = String(minutes).padStart(2, '0');

    return `${hoursString}h ${minutesString}m`;
}

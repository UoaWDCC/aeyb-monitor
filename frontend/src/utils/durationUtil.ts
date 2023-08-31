export function durationToNumber(value: string) {
    const [hours, minutes] = value.split(':').map(Number);
    return hours * 60 + minutes;
}

export function numberToDuration(duration: number) {
    return `${(Math.floor(duration / 60) / 100).toFixed(2).slice(-2)}:${((duration % 60) / 100).toFixed(2).slice(-2)}`;
}

export function getCombinedTime(startDate, startTime, duration) {
    const combinedStart = new Date(startDate);
    combinedStart.setHours(startTime.getHours(), startTime.getMinutes());

    const combinedFinish = new Date(combinedStart);
    combinedFinish.setMinutes(combinedFinish.getMinutes() + duration);

    return { startTime: combinedStart.getTime(), finishTime: combinedFinish.getTime() };
}

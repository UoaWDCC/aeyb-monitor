export function roundToHour(date: Date) {
    const time = date.getTime();
    const msPerHour = 1000 * 60 * 60;
    const roundedTime = Math.round(time / msPerHour) * msPerHour;
    return new Date(roundedTime);
}

export function addOneHour(date: Date) {
    return new Date(date.getTime() + 60 * 60 * 1000);
}

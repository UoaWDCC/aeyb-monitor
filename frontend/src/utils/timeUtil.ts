export function roundToHour(date: Date) {
    const time = date.getTime();
    const msPerHour = 1000 * 60 * 60;
    const roundedTime = Math.round(time / msPerHour) * msPerHour;
    return new Date(roundedTime);
}

export function addOneHour(date: Date) {
    return new Date(date.getTime() + 60 * 60 * 1000);
}

export function getRelativeTime(time: number): string {
    const difference = Math.abs(Date.now() - time);
    if (difference / 86400000 > 1) {
        return `${Math.round(difference / 86400000)} days`;
    } else if (difference / 3600000 > 1) {
        return `${Math.round(difference / 3600000)} hours`;
    } else {
        return `${Math.round(difference / 60000)} minutes`;
    }
}

export function getRelativeTime(time: number): string {
    const difference = Math.abs(Date.now() - time);
    if (difference / 86400000 > 1) {
        return `${Math.ceil(difference / 86400000)} days`;
    } else if (difference / 3600000 > 1) {
        return `${Math.ceil(difference / 3600000)} hours`;
    } else {
        return `${Math.ceil(difference / 60000)} minutes`;
    }
}

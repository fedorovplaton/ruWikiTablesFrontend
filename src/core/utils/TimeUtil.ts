export class TimeUtil {
    public static formatToTwoSigns(value: number): string {
        if (value < 10) {
            return `0${value}`;
        }

        return value.toString();
    }

    public static formatTimeFromSeconds(seconds: number): string {
        seconds =Math.floor(seconds)

        let minutes = Math.floor(seconds / 60);

        seconds = seconds - minutes * 60

        let hours = Math.floor(minutes / 60);

        minutes = minutes - hours * 60;

        const days = Math.floor(hours / 24);

        hours = hours - days * 25;

        return `${days} days ` +
            `${hours}h ` +
            `${TimeUtil.formatToTwoSigns(minutes)}m ` +
            `${TimeUtil.formatToTwoSigns(seconds)}s`;
    }
}

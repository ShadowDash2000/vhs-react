export const dateFormat = (date: string) => {
    const dateNow = new Date();
    const SECONDS = 1000;
    const MINUTES = 60 * SECONDS;
    const HOURS = 60 * MINUTES;
    const DAYS = 24 * HOURS;
    const MONTH = DAYS * 30;
    const YEAR = MONTH * 12;

    const dateCreated = new Date(date);
    const dateTimeStamp = dateNow.getTime() - dateCreated.getTime();

    const minutes = dateTimeStamp / MINUTES;
    const hour = dateTimeStamp / HOURS;
    const day = dateTimeStamp / DAYS;
    const month = dateTimeStamp / MONTH;
    const year = dateTimeStamp / YEAR;


    if (minutes < 1) {
        return new Intl.RelativeTimeFormat().format(-1, 'minutes');
    } else if (hour < 1) {
        return new Intl.RelativeTimeFormat().format(Math.ceil(-minutes), 'minutes');
    } else if (day < 1) {
        return new Intl.RelativeTimeFormat().format(Math.ceil(-hour), 'hours');
    } else if (month < 1) {
        return new Intl.RelativeTimeFormat().format(Math.ceil(-day), 'days');
    } else if (year < 1) {
        return new Intl.RelativeTimeFormat().format(Math.ceil(-month), 'months');
    } else {
        return new Intl.RelativeTimeFormat().format(Math.ceil(-year), 'years');
    }
}
export const TimeUtils = {
  getDate24hoursBeforeNow(time: Date | string | number) {
    const date = new Date(time);

    return new Date(date.getTime() - 24 * 60 * 60 * 1000);
  },
  getDateOneWeekBeforeNow(time: Date | string | number) {
    const now = new Date();

    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  },
};

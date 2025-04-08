import dayjs from "dayjs";
import "dayjs/locale/de";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";

const dayjsExt = dayjs;

// Set defaults
dayjs.locale("de");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

// Helper functions for timezone conversion
export const toUTC = (date: Date) => {
  return dayjs(date).utc();
};

export const toUTCTime = (timeString: string) => {
  // Create a date object for today with the given time, keeping the time as-is
  const today = dayjs().utc().format("YYYY-MM-DD");
  return dayjs(`${today} ${timeString}`, "YYYY-MM-DD HH:mm").utc().toDate();
};

export const toLocalDate = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin").startOf("day");
};

export const toLocalDateTime = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin");
};

export const toLocalTime = (time: Date | null) => {
  if (!time) return null;
  // Use UTC methods to preserve the hour value
  return dayjs.utc(time);
};

export const formatTime = (time: Date | null) => {
  if (!time) return "";
  // Use UTC format to avoid timezone conversion
  return dayjs.utc(time).format("HH:mm");
};

export { dayjsExt };

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
  // Create a date object for today with the given time in German timezone
  const today = dayjs().tz("Europe/Berlin").format("YYYY-MM-DD");
  // Create the datetime in German timezone, then convert to UTC for storage
  return dayjs
    .tz(`${today} ${timeString}`, "YYYY-MM-DD HH:mm", "Europe/Berlin")
    .utc()
    .toDate();
};

export const toLocalDate = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin").startOf("day");
};

export const toLocalDateTime = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin");
};

export const toLocalTime = (time: Date | null) => {
  if (!time) return null;
  // Convert UTC time to German timezone
  return dayjs.utc(time).tz("Europe/Berlin");
};

export const formatTime = (time: Date | null) => {
  if (!time) return "";
  // Convert UTC time to German timezone and format
  const localTime = toLocalTime(time);
  if (!localTime) return "";
  return localTime.format("HH:mm");
};

export { dayjsExt };

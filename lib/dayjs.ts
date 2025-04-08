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

export const toLocalDate = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin").startOf("day");
};

export const toLocalDateTime = (date: Date) => {
  return dayjs(date).tz("Europe/Berlin");
};

export { dayjsExt };

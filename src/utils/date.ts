import dayjs, { ManipulateType, OpUnitType, QUnitType } from 'dayjs';

import calendar from 'dayjs/plugin/calendar';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

const TimeFormats = {
  default: 'YYYY/MM/DD HH:mm',
  full: 'llll',
  normal: 'YYYY/MM/DD',
  time: 'HH:mm:ss',
  custom: 'custom',
};

export const formatDate = (
  date: string | Date,
  format: keyof typeof TimeFormats = 'default',
  customFormat = '',
): string => {
  if (!date) return '';

  if (format !== 'custom') {
    return dayjs(date).format(TimeFormats[format]);
  }

  return dayjs(date).format(customFormat);
};

export const unixToDate = (
  unix: number,
  format: keyof typeof TimeFormats = 'default',
  customFormat = '',
): string => {
  return formatDate(dayjs.unix(unix).format(), format, customFormat);
};

export const showDateFromNow = (date: string): string => {
  return dayjs(date).calendar(null, { sameElse: 'MMMM DD, YYYY hh:mm A' });
};

type AddTimeUnits =
  | 'millisecond'
  | 'second'
  | 'minute'
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'quarter'
  | 'year';

export const addTimeToNow = (value: number | string, unit: AddTimeUnits = 'second') => {
  return dayjs()
    .add(+value, unit as ManipulateType)
    .format();
};

export const dateDifference = (value?: string, unit: QUnitType | OpUnitType = 'y') => {
  if (!value) {
    undefined;
  }

  return dayjs().diff(value, unit);
};

import convert from 'convert';
import { DurationUnit } from '../../data-lookup/enums/data-lookup.enum';

export const durationConverter = (duration: number, durationUnit: string) => {
  if (durationUnit === DurationUnit.SECOND) {
    return duration;
  } else if (durationUnit === DurationUnit.MINUTE) {
    return convert(duration, 'minutes').to('seconds');
  } else if (durationUnit === DurationUnit.HOUR) {
    return convert(duration, 'hours').to('seconds');
  } else if (durationUnit === DurationUnit.DAY) {
    return convert(duration, 'days').to('seconds');
  } else if (durationUnit === DurationUnit.WEEK) {
    return convert(duration, 'weeks').to('seconds');
  } else if (durationUnit === DurationUnit.MONTH) {
    return convert(duration, 'months').to('seconds');
  } else if (durationUnit === DurationUnit.YEAR) {
    return convert(duration, 'years').to('seconds');
  }
  return 0;
};

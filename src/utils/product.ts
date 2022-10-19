import { SHOW_TWENTY_FOUR, SHOW_TWELVE } from '../constants';

export const getExpectedDeliveryDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
};

export const getOffset = ({
  limit,
  offset,
}: {
  limit: number;
  offset: number;
}) => {
  if (offset === 0) {
    return offset;
  } else if (limit === SHOW_TWENTY_FOUR) {
    return limit;
  } else {
    return (offset / SHOW_TWENTY_FOUR) * SHOW_TWELVE;
  }
};

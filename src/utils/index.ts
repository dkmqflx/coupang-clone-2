export const getExpectedDeliveryDate = (date: string) => {
  const dateObj = new Date(date);
  return `${dateObj.getMonth() + 1}/${dateObj.getDate()}`;
};

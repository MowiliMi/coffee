export const isBlackFriday = () => {
  const today = new Date();
  return today.getMonth() === 10 && today.getDate() === 26;
};

export const isHoliday = () => {
  const today = new Date();
  return today.getMonth() === 7 || today.getMonth() === 8;
};

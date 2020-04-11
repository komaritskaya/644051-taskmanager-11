export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomBool = () => {
  return Math.random() < 0.5
};

export const getRandomItemFromArray = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

export const getRandomDate = () => {
  const targetDate = new Date();
  const sign = getRandomBool() ? 1 : -1;
  const diffValue = sign * getRandomInt(0, 7);
  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

export const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

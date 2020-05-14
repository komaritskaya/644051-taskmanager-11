import moment from "moment";

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomBool = () => {
  return Math.random() < 0.5;
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

export const formatTime = (date) => {
  return moment(date).format(`hh:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`DD MMMM`);
};

export const isRepeating = (repeatingDays) => {
  return Object.values(repeatingDays).some(Boolean);
};

export const isOverdueDate = (dueDate, date) => {
  return dueDate < date && !isOneDay(date, dueDate);
};

export const isOneDay = (dateA, dateB) => {
  const a = moment(dateA);
  const b = moment(dateB);
  return a.diff(b, `days`) === 0 && dateA.getDate() === dateB.getDate();
};

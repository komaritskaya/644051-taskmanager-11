import {
  getRandomBool,
  getRandomItemFromArray,
  getRandomDate,
} from '../utils';
import {
  COLORS,
  DAYS,
} from '../const';

const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const generateDefaultRepeatingDays = () => (
  Object.assign(...DAYS.map((day) => ({[day]: false})))
);

const generateRepeatingDays = () => (
  Object.assign(...DAYS.map((day) => ({[day]: getRandomBool()})))
);

export const generateTask = () => {
  const dueDate = getRandomBool() ? null : getRandomDate();
  return {
    description: getRandomItemFromArray(descriptions),
    dueDate,
    repeatingDays: dueDate ? generateDefaultRepeatingDays() : generateRepeatingDays(),
    color: getRandomItemFromArray(COLORS),
    isArchive: getRandomBool(),
    isFavorite: getRandomBool(),
  };
};

export const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

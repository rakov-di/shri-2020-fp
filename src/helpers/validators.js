/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import {
  allPass,
  equals,
  filter,
  gte,
  length,
  keys,
  propEq,
  tap
} from 'ramda';

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({star, square, triangle, circle}) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
  const isGreen = figure => figure === 'green';
  const greenFigures = filter(isGreen, figures);
  const greenFiguresСount = length(keys(greenFigures));

  return gte(greenFiguresСount, 2);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
  const isRed = figure => figure === 'red';
  const isBlue = figure => figure === 'blue';

  const redFigures = filter(isRed, figures);
  const redFiguresСount = length(keys(redFigures));

  const blueFigures = filter(isBlue, figures);
  const blueFiguresСount = length(keys(blueFigures));
  tap(console.log('hi', redFiguresСount, blueFiguresСount));

  return equals(redFiguresСount, blueFiguresСount)
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = ({star, square, circle}) => {
  const cond1 = propEq('circle', 'blue');
  const cond2 = propEq('star', 'red');
  const cond3 = propEq('square', 'orange');
  const allConds = allPass([cond1, cond2, cond3]);

  return allConds({star, square, circle});
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = () => false;

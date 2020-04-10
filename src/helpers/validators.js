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
  and,
  any,
  all,
  allPass,
  apply,
  compose,
  countBy,
  curry,
  equals,
  isEmpty,
  filter,
  gte,
  length,
  keys,
  not,
  omit,
  prop,
  propEq,
  values,
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
export const validateFieldN5 = (figures) => {
  const isNotWhite = figure => not(equals(figure, 'white'));
  const notWhiteFigures = filter(isNotWhite, figures);

  const dumb = (color) => color;
  const colorsCount = values(countBy(dumb)(values(notWhiteFigures)));

  const max = apply(Math.max, colorsCount);

  return gte(max, 3);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => {
  // Условие можно переформулировать так:
  // 1. Один зеленый треугольник,
  // 2. Еще одна любая зеленая
  // 3. Еще одна любая красная

  const getTriangle = prop('triangle');
  const isGreen = equals('green');
  const isRed = equals('red');

  const checkIsTriangleGreen = compose(
    isGreen,
    getTriangle
  );

  const isOne = compose(
    equals(1),
    length,
    keys
  );

  const checkIsOtherOneGreen = compose(
    isOne,
    filter(isGreen),
    omit(['triangle'])
  );

  const checkIsOtherOneRed = compose(
    isOne,
    filter(isRed),
    omit(['triangle'])
  );

  const validate = allPass([checkIsTriangleGreen, checkIsOtherOneRed, checkIsOtherOneGreen]);

  return validate(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
  const isOrange = equals('orange');

  return all(isOrange)(values(figures));
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({star}) => {
  const isStarNotRed = not(equals(star, 'red'));
  const isStarNotWhite = not(equals(star, 'white'));

  return and(isStarNotRed, isStarNotWhite)
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
  const isGreen = equals('green');

  return all(isGreen)(values(figures));
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = (figures) => {
    const isSquareNotWhite = not(equals(figures.square, 'white'));
    const isTriangleNotWhite = not(equals(figures.triangle, 'white'));
    const isSameColor = equals(figures.square, figures.triangle);

    const areNotWhite = and(isSquareNotWhite, isTriangleNotWhite);

    return and(areNotWhite, isSameColor);
};

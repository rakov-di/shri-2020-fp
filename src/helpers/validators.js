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

// Можно было бы вынести дополнительные функции в общую область видимости
// (вроде `prop('star'`) и уменьшить импорт из Ramda.
// Не сделал этого сознательно, т.к. хотелось
// попробовать больше функций в реальности.

import {
  and,
  all,
  allPass,
  apply,
  pipe,
  compose,
  converge,
  countBy,
  equals,
  filter,
  identity,
  length,
  lte,
  keys,
  not,
  omit,
  prop,
  propEq,
  values
} from 'ramda';


const isWhite = equals('white');
const isRed = equals('red');
const isOrange = equals('orange');
const isGreen = equals('green');
const isBlue = equals('blue');

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    const getStar = prop('star');
    const getSquare = prop('square');
    const getTriangle = prop('triangle');
    const getCircle = prop('circle');

    const checkIsStarRed = compose(equals('red'), getStar);
    const checkIsSquareGreen = compose(equals('green'), getSquare);
    const checkIsTriangleWhite = compose(equals('white'), getTriangle);
    const checkIsCircleWhite = compose(equals('white'), getCircle);

    const validation = allPass([checkIsStarRed, checkIsSquareGreen, checkIsTriangleWhite, checkIsCircleWhite]);

    return validation(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
  const validation = pipe(filter(isGreen), keys, length, lte(2) );

  return validation(figures);
};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
  const redFiguresCount = pipe(filter(isRed), keys, length);
  const blueFiguresCount = pipe(filter(isBlue), keys, length);

  const validation = converge(equals, [redFiguresCount, blueFiguresCount]);

  return validation(figures);
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = ({star, square, circle}) => {
  const isCircleBlue = propEq('circle', 'blue');
  const isStarRed = propEq('star', 'red');
  const isSquareOrange = propEq('square', 'orange');

  const validation = allPass([isCircleBlue, isStarRed, isSquareOrange]);

  return validation({star, square, circle});
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
  const isNotWhite = figure => not(equals(figure, 'white'));

  const validation = pipe(
    filter(isNotWhite),
    values,
    countBy(identity),
    values,
    apply(Math.max),
    lte(3)
  );

  return validation(figures);
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = (figures) => {
  // Условие можно переформулировать так:
  // 1. Один зеленый треугольник,
  // 2. Еще одна любая зеленая
  // 3. Еще одна любая красная

  const getTriangle = prop('triangle');
  const isOne = pipe(keys, length, equals(1));

  const checkIsTriangleGreen = pipe(getTriangle, isGreen);
  const checkIsOtherOneGreen = pipe(omit(['triangle']), filter(isGreen), isOne);
  const checkIsOtherOneRed = pipe(omit(['triangle']), filter(isRed), isOne);

  const validate = allPass([checkIsTriangleGreen, checkIsOtherOneRed, checkIsOtherOneGreen]);

  return validate(figures);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (figures) => {
  const validation = pipe(values, all(isOrange));

  return validation(figures);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({star}) => {
  const isStarNotRed = pipe(isRed, not);
  const isStarNotWhite = pipe(isWhite, not);

  const validation = allPass([isStarNotRed, isStarNotWhite]);

  return validation(star);

  // const isStarNotWhite = not(equals(star, 'white'));
  // const isStarNotRed = not(equals(star, 'red'));
  // return and(isStarNotRed, isStarNotWhite)
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = (figures) => {
  const validation = pipe(values, all(isGreen));

  return validation(figures);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = ({ square, triangle }) => {
    const isSquareNotWhite = pipe(equals('white'), not)(square);
    const isTriangleNotWhite = pipe(equals('white'), not)(triangle);

    const areNotWhite = and(isSquareNotWhite, isTriangleNotWhite);
    const isSameColor = equals(square, triangle);

    return and(areNotWhite, isSameColor);
};

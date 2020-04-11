/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import {
  allPass,
  andThen,
  gt,
  compose,
  ifElse,
  length,
  lt,
  otherwise,
  pipe,
  prop,
  tap,
  test
} from 'ramda';

const api = new Api();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const isValid = allPass([
    compose(gt(10), length),
    compose(lt(2), length),
    test(/^(\d+\.)?\d+$/)
  ]);

  const toNum = val => Number(val);
  const roundNum = num => Math.round(num);
  const squareNum = num => Math.pow(num, 2);
  const mod3 = num => num % 3;

  const toBinary = number => api.get('https://api.tech/numbers/base', { number, from: 10, to: 2 });
  const getAnimal = num => api.get(`https://animals.tech/${num}`, {});

  const doGetAnimal = pipe(
    getAnimal,
    andThen(
      pipe(
        prop('result'),
        handleSuccess
      )
    ),
    otherwise(handleError)
  );

  const doToBinary = pipe(
    toBinary,
    andThen(
      pipe(
        prop('result'),
        tap(writeLog),
        length,
        tap(writeLog),
        squareNum,
        tap(writeLog),
        mod3,
        tap(writeLog),
        doGetAnimal,
      )
    ),
    otherwise(handleError)
  );

  const doIfValid = pipe(
    toNum,
    roundNum,
    tap(writeLog),
    doToBinary
  );

  const doIfError = () => handleError('ValidationError');

  const validation =  pipe(
    tap(writeLog),
    ifElse(
      isValid,
      doIfValid,
      doIfError
    )
  );

  return validation(value);
};

export default processSequence;

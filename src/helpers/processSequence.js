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
  __,
  allPass,
  gt,
  compose,
  ifElse,
  includes,
  length,
  lt,
  partial,
  range,
  split,
  tap,
  test
} from 'ramda';

const api = new Api();

// /**
//  * Я – пример, удали меня
//  */
// const wait = time => new Promise(resolve => {
//     setTimeout(resolve, time);
// });

const changeNumberSystem = async (number, from, to) => {
  const url = 'https://api.tech/numbers/base';
  const params = { number, from, to };

  return await api.get(url, params)
    .then(response => response.result)
    .catch(error => error.message)
};

const getAnimal = async (id) => {
  const url = `https://animals.tech/${id}`;

  return await api.get(url, {})
    .then(response => response.result)

    .catch(error => error.message)
};


const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    /**
     * Я – пример, удали меня
     */

    writeLog(value);

    const checkIsLongerThan2 = compose(
      lt(2),
      length,
      split('')
    );

    const checkIsShorterThan10 = compose(
      gt(10),
      length,
      split('')
    );

    // TODO переписать чтоб работало, а то тут и на >0 и на число впроверяется одновременно
    const checkIsMoreThan0 = lt(0);

    const isNum = compose(test(/([0-9]|\.)/g));

    const checkIsValid = allPass([
      checkIsLongerThan2,
      checkIsShorterThan10,
      checkIsMoreThan0,
      isNum
    ]);

    // tap(console.log(checkIsLongerThan2(value),
    //   checkIsShorterThan10(value),
    //   checkIsMoreThan0(value),
    //   isNum(value)));

    const isValid = checkIsValid(value);

    isValid ? writeLog('isValid: ' + true) : handleError('ValidationError');

    const valueRounded = Math.round(value);
    writeLog('valueRounded: ' + valueRounded);

    const binaryValue = await changeNumberSystem(valueRounded, 10, 2);
    writeLog('binaryValue: ' + binaryValue);

    const binaryValueSymCount = length(binaryValue);
    writeLog('binaryValueSymCount: ' + binaryValueSymCount);

    // const powCarried = partial(Math.pow(__, 2))
    const squareNum = (num) => Math.pow(num, 2);
    const mod = (num) => num % 3;

    const writeLogFunc = value => {
      writeLog(value);
      return value;
    };

    const getAnimalAsync = async (value) => await getAnimal(value);
    const answer = compose(
      // writeLogFunc,
      // await getAnimal,
      writeLogFunc,
      mod,
      writeLogFunc,
      squareNum,
      writeLogFunc,
      length
    );

    // const result = answer(binaryValue);

    const a = handleSuccess(await getAnimal(answer(binaryValue)));
};

export default processSequence;

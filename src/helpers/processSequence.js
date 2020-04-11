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
  gt,
  compose,
  ifElse,
  includes,
  length,
  lt,
  range,
  split,
  tap,
  test
} from 'ramda';

const api = new Api();

/**
 * Я – пример, удали меня
 */
const wait = time => new Promise(resolve => {
    setTimeout(resolve, time);
});

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
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

    tap(console.log(checkIsLongerThan2(value),
      checkIsShorterThan10(value),
      checkIsMoreThan0(value),
      isNum(value)));

    const isValid = checkIsValid(value);

    tap(console.log(isValid));

    isValid ? writeLog('isValid: ' + true) : handleError('ValidationError');

    // validation(value)

    // api.get('https://api.tech/numbers/base', {from: 2, to: 10, number: '01011010101'}).then(({result}) => {
    //     writeLog(result);
    // });
    //
    // wait(2500).then(() => {
    //     writeLog('SecondLog')
    //
    //     return wait(1500);
    // }).then(() => {
    //     writeLog('ThirdLog');
    //
    //     return wait(400);
    // }).then(() => {
    //     handleSuccess('Done');
    // });
};

export default processSequence;

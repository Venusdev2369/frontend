import { SetArray, SetNum} from './interfaces';
import { SET_NUMBER, SET_PRICE } from './types';
import { number } from 'prop-types';

export const setArray = (num: number): SetArray => ({
    type: SET_NUMBER,
    numArray: num
})
export const setNum = (num: number): SetNum => ({
    type: SET_PRICE,
    curNum: num
})


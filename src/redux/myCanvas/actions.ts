import { SetCanvas} from './interfaces';
import { SET_CANVAS } from './types';
import { number } from 'prop-types';

export const setCanvas = (num: any): SetCanvas => ({
    type: SET_CANVAS,
    canvas: num
})


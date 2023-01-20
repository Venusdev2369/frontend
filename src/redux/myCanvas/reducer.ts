import { AnyAction } from 'redux';
import { IDataState } from './interfaces';
import * as types from './types';
const initialState: IDataState = {
    canvas: null,
};

function CanvasReducer(state, action: AnyAction): IDataState {
    if(state == undefined || state == null)state = initialState;
    switch (action.type) {
        case types.SET_CANVAS: {
            return {
                ...state
            };
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
export default CanvasReducer;

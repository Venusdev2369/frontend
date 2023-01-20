import { combineReducers } from 'redux';
import { GameReducer } from './game-reducer';
import { CanvasReducer } from './myCanvas';


const rootReducer = combineReducers({
    gameReducer: GameReducer,
    canvasReducer: CanvasReducer
});

export type IReducer = ReturnType<typeof rootReducer>;
export default rootReducer;

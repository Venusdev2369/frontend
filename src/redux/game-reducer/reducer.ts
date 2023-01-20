import { AnyAction } from 'redux';
import { IDataState } from './interfaces';
import * as types from './types';
const p = 'btn btn-success equals'
const e = 'btn btn-danger'
const s = 'btn btn-secondary'
const d = 'btn btn-dark'
const initialState: IDataState = {
    numArray: [],
    btnValues: [
        0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, '2:1',
        2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, '2:1',
        1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, '2:1'
    ],
    btnText: [p, e, s, e, e, s, e, e, s, e, e, s, e, d,
        s, e, s, s, e, s, s, e, s, s, e, s, d,
        e, s, e, s, s, e, e, s, e, s, s, e, d],
    data: [
        {
            "option": "0",
            "style": {
                "backgroundColor": "#3BC123",
                "textColor": "white"
            }
        },
        {
            "option": "32",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "15",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "19",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "4",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "21",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "2",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "25",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "17",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "34",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "6",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "27",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "13",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "36",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "11",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "30",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "8",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "23",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "10",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "5",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "24",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "16",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "33",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "1",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "20",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "14",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "31",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "9",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "22",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "18",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "29",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "7",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "28",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "12",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "35",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        },
        {
            "option": "3",
            "style": {
                "backgroundColor": "#1B141B",
                "textColor": "white"
            }
        },
        {
            "option": "26",
            "style": {
                "backgroundColor": "#E31142",
                "textColor": "white"
            }
        }
    ],
    backgroundColors: ['#35459F', '#16171B'],
    textColors: ['white'],
    outerBorderColor: '#111422',
    outerBorderWidth: 5,
    innerBorderColor: '#30261a',
    innerBorderWidth: 0,
    innerRadius: 50,
    radiusLineColor: '#30261a',
    radiusLineWidth: 1,
    fontSize: 10,
    textDistance: 85,
    width: 900,
    height: 900,
    perpendicularText: true,
    curNum: -1
};

function GameReducer(state, action: AnyAction): IDataState {
    if(state == undefined || state == null)state = initialState;
    switch (action.type) {
        case types.SET_NUMBER: {
            if (Number(action.numArray) == -1) while (state.numArray.lenngth > 0) state.numArray.pop();
            if (state.numArray.indexOf(action.numArray) == -1)
                state.numArray.push(Number(action.numArray));
            return {
                ...state
            };
        }
        case types.SET_PRICE:{
            state.curNum = action.curNum;
            console.log(state.curNum, 'sdfsdf')
            return {...state}
        }
        default: {
            return {
                ...state,
            };
        }
    }
}
export default GameReducer;

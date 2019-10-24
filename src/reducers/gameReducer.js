import { SET_GAME_ID, SET_CURRENT_PART } from '../constants/actions';

const initialState = {
    gameId: null,
    currentPart: null
};

export function gameState(state = initialState, action) {
    switch(action.type){
        case SET_GAME_ID:
            return {
                ...state,
                gameId: action.gameId
            }
        
        case SET_CURRENT_PART:
            return {
                ...state,
                currentPart: action.part
            }

        default:
            return state;
    }
}


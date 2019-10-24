import { SET_GAME_ID, SET_CURRENT_PART, SET_NEXT_PART } from '../constants/actions';

const initialState = {
    gameId: null,
    currentPart: null,
    nextPart: null
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
        
        case SET_NEXT_PART:
            return {
                ...state,
                nextPart: action.part
            }

        default:
            return state;
    }
}


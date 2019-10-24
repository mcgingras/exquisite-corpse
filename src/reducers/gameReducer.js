import { SET_GAME_ID } from '../constants/actions';

const initialState = {
    gameId: null
};

export function gameState(state = initialState, action) {
    switch(action.type){
        case SET_GAME_ID:
            return {
                ...state,
                gameId: action.gameId
            }

        default:
            return state;
    }
}


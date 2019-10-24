import { SET_GAME_ID, SET_CURRENT_PART, SET_NEXT_PART } from '../constants/actions';

/**
 * 
 * @param {string} gameId 
 * sets the gameId for the current game, which is needed to query data from fb later.
 */
export function setGameId(gameId){
    return {
        type: SET_GAME_ID,
        gameId
    }
}

/**
 * 
 * @param {string} part - the body part currently in focus
 */
export function setCurrentPart(part){
    return {
        type: SET_CURRENT_PART,
        part
    }
}

export function setNextPart(part){
    return {
        type: SET_NEXT_PART,
        part
    }
}
import { SET_GAME_ID } from '../constants/actions';

/**
 * 
 * @param {int} gameId 
 * sets the gameId for the current game, which is needed to query data from fb later.
 */
export function setGameId(gameId){
    return {
        type: SET_GAME_ID,
        gameId
    }
}
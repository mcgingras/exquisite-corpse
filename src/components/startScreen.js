import React, { useRef } from 'react';
import { useFirestore } from 'react-redux-firebase'
import { useDispatch } from 'react-redux';
import { navigate } from 'hookrouter';
import { SET_GAME_ID, SET_CURRENT_PART } from '../constants/actions';

/**
 * StartScreen Component
 * 
 * @summary
 * this component renders the start screen, buttons to join game or start game.
 * 
 * @notes
 * We could def modularize these components more (buttons, inputs etc)
 * But generally I think thats too much modularity for now.
 * Can return back to that later if we feel like it
 * 
 * @anna
 * useRef, useState are hooks, part of the new react hooks pattern.
 * Just wanted to point that out for you so you can investigate it more.
 */
const StartScreen = () => {
    const firestore = useFirestore();
    const joinGameEl = useRef(null);
    const dispatch = useDispatch();

    
    const startNewGame = () => {
        let id = Math.random().toString(36).substring(8);
        dispatch({ type: SET_GAME_ID, gameId: id });
        dispatch({ type: SET_CURRENT_PART, part: 'head' });

        /**
         * document structure
         * id - id of game (gets set as document under collection)
         * live - boolean, if game is live or not, true
         */
        var gamesRef = firestore.collection("games");
        gamesRef.doc(id).set({
             live: true,
             currentPart: null,
             head: null,
             torso: null,
             leftArm: null,
             rightArm: null,
             legs: null
        });

        navigate('/canvas');
    }

    /**
     * @note
     * since we are using redux-firestore I think we might have this in redux?
     * might have to subscribe to store first, not sure... can go back on this one.
     */
    async function joinGame() {
        const gameID = joinGameEl.current.value;
        let fsref = await firestore.collection('games').get();
        let gameIDs = fsref.docs.map(doc => {return doc.data().id});
        if(gameIDs.includes(gameID)){
            dispatch({ type: SET_GAME_ID, gameId: gameID });
            // figure out which part they have.
            navigate('/canvas');
        }
        else{
            alert('not a valid game! please try again.')
        } 
    }

    return (
        <div className="App">
            <div>
                <h1>Exquisite Corpse</h1>

                <h3>New Game</h3>
                <button onClick={() => {startNewGame()}}>Start</button>

                <h3>Join Game</h3>
                <input  
                    type="text"
                    ref={joinGameEl}
                />
                <button onClick={() => {joinGame()}}>Join</button>
            </div>
        </div>
    )
}

export default StartScreen;
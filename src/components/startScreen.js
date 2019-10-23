import React, { useRef } from 'react';
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'

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

    
    const startNewGame = () => {
        let id = Math.random().toString(36).substring(8);

        /**
         * document structure
         * id - id of game
         * live - boolean, if game is live or not, true
         */
        firestore.collection('games').add({
             id,
             live: true
        })
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
        gameIDs.includes(gameID) ? console.log('included') : console.log('not included');
        
    }

    return (
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
    )
}

export default StartScreen;
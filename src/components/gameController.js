import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase'
import { navigate } from 'hookrouter';
import { partOrder } from '../constants/partOrder';
import Canvas from './canvas';




/**
 * GameController
 * 
 * @summary
 * this component controls the logic for what canvas to render and what to save
 * in the two step drawing process.
 * 
 */
const GameController = () => {
    const gameId = useSelector(state => state.gameState.gameId);
    const [currentPart, setCurrentPart] = useState(null);
    const [nextPart, setNextPart] = useState(null);
    const [isLastDrawing, setIsLastDrawing] = useState(null);

    /**
     * load current part from firebase
     * use current part to determine next part using partOrder dictionary
     * set the state of currentpart + nextpart.
     */
    const firestore = useFirestore();
    useEffect(() => {
        async function loadFromFb(){
            let gameData = await firestore.collection('games').doc(gameId).get();
            let currentPart = gameData.data().currentPart;
            setCurrentPart(currentPart);
            setNextPart(partOrder[currentPart]);
            setIsLastDrawing(nextPart == "null" ? true : false);
        } 
        loadFromFb();
    })

    // pass this to canvas so when it saves, we toggle next part
    const toggleNextPart = () => {
        setIsNextPart(true);
        setShowIntroduction(true);
    }

    console.log(isLastDrawing);
    

    /**
     * logic for what screen to show (prompt vs canvas)
     * showIntroduction is boolean for showing prompt
     * isNextPart is boolean for showing 2nd canvas (the start of the next drawing...)
     */
    const [showIntroduction, setShowIntroduction] = useState(true);
    const [isNextPart, setIsNextPart] = useState(false);

    const Introduction = () => {
        return (
            <div>
                {!isNextPart
                 ?  <p>you are drawing {currentPart}</p>
                 :  <p>
                        {isLastDrawing ?
                         `Drawing finished! Go to showcase.` : 
                         `start drawing ${nextPart} for the next player`
                        }
                    </p>
                }
    
                { isNextPart && isLastDrawing
                 ? <button onClick={() => {navigate('/showcase')}}>showcase</button>
                 : <button onClick={() => {setShowIntroduction(false)}}>ok</button>
                }
            </div>
        )
    }
    
    return (
        <div>
            {showIntroduction 
             ? <Introduction /> 
             : <Canvas
                toggleNextPart={toggleNextPart}
                isNextPart={isNextPart}
                currentPart={currentPart}
                nextPart={nextPart}
                />
            }
        </div>
    )
}

export default GameController;
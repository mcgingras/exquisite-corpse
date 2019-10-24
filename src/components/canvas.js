import React, { useState, useRef, useEffect } from 'react';
import {SketchField, Tools} from 'react-sketch';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase'
import { navigate } from 'hookrouter';
import { partOrder } from '../constants/partOrder';

/**
 * Canvas Component
 * 
 * @summary
 * this component is the canvas a user will sketch on.
 * 
 * @Anna 
 * this is good time to explain some gr8 things about react...
 * We know we are going to have many Canvas instances
 * current sketch vs adjacent sketch for neighbor
 * and those will have different logic incorporated to a similar canvas UI
 * 
 * So, rather than copy paste all the UI code for each, we can reuse it and
 * just add different logic depending on which state the user is in
 */
const Canvas = () => {
    const firestore = useFirestore();
    const _sketch = useRef(null);
    const [showIntroduction, setShowIntroduction] = useState(true);
    const [isNextPart, setIsNextPart] = useState(false);

    /** state for config of canvas
     * --- 
     * setConfig to change, im assuming will trigger a re-render?
     * need to read more into the docs, but its minimal :(
     */
    const [config, setConfig] = useState({
        color: 'black',
        lineWidth: 3
    });

    const [currentPart, setCurrentPart] = useState(null);
    const [nextPart, setNextPart] = useState(null);
    const gameId = useSelector(state => state.gameState.gameId);
    
    useEffect(() => {
        async function loadFromFb(){
            let gameData = await firestore.collection('games').doc(gameId).get();
            setCurrentPart(gameData.data().currentPart);
            setNextPart(partOrder[currentPart]);
        } 
        loadFromFb();
    })

    async function fetchData(){
        let snap = await firestore.collection('games').doc('mk6l').get();
        let data = snap.data().data;
        _sketch.current.addImg(data, {left: 0, top: 0, scale: 1});
    }

    const undoPath = () => {
        _sketch.current.undo();
    }

    const redoPath = () => {
        _sketch.current.redo();
    }

    /**
     * saves data at dataurl, which can be loaded in later.
     */
    async function saveSketch() {
        let data = _sketch.current.toDataURL(); 

        if(!isNextPart){
            let fsref = await firestore.collection('games').doc(gameId).update({[currentPart]: data});
            setShowIntroduction(true);
            setIsNextPart(true);
        }
        else{
            let fsref = await firestore.collection('games').doc(gameId).update({[nextPart]: data});
            // can navigate to a page saying thank you or something.
            firestore.collection('games').doc(gameId).update({currentPart: nextPart});
            navigate('/');
        }
    }

    const showCanvas = () => {
        setShowIntroduction(false);
        // if data to fetch...
        fetchData();
    }

    return (
        <div>
            {showIntroduction ? 
            <div>
                {!isNextPart ?
                    <p>you are drawing {currentPart}</p>
                    :
                    <p>{nextPart != null ? `Drawing finished! Go to showcase.` : `start drawing ${nextPart} for the next player` }</p>
                    
                }
                {nextPart != null ? <button onClick={() => {showCanvas()}}>ok</button> : <button onClick={() => {navigate('/showcase')}}>showcase</button> }
                
            </div>
            :
            <div>
                {/* using this library for sketching
                    https://github.com/tbolis/react-sketch */}
                <SketchField 
                    ref={_sketch}
                    className="canvas"
                    width='300px' 
                    height='300px' 
                    tool={Tools.Pencil} 
                    lineColor={config.color}
                    lineWidth={config.lineWidth
                }/>
                
                <button onClick={() => {undoPath()}}>Undo</button>
                <button onClick={() => {redoPath()}}>Redo</button>
                <button onClick={() => {saveSketch()}}>Save</button>
            </div>
            }
        </div>
    )
}

export default Canvas;
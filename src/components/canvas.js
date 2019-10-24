import React, { useState, useRef } from 'react';
import {SketchField, Tools} from 'react-sketch';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase'

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
    const [showPart, setShowPart] = useState(true);

    /** state for config of canvas
     * --- 
     * setConfig to change, im assuming will trigger a re-render?
     * need to read more into the docs, but its minimal :(
     */
    const [config, setConfig] = useState({
        color: 'black',
        lineWidth: 3
    });

    const gameId = useSelector(state => state.gameState.gameId);
    const currentPart = useSelector(state => state.gameState.currentPart);
    console.log(currentPart);
    

    async function fetchData(){
        let snap = await firestore.collection('games').doc('mk6l').get();
        let data = snap.data().data;
        _sketch.current.addImg(data, {left: 0, top: 0, scale: 1});
    }

    const changeColor = (color) => {
        setConfig({
            ...config,
            color
        })
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
        let fsref = await firestore.collection('games').doc(gameId).set({[currentPart]: data});
    }
    

    return (
        <div>
            {showPart ? 
            <div>
                you are drawing {currentPart}
                <button onClick={() => {setShowPart(false); fetchData()}}>ok</button>
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
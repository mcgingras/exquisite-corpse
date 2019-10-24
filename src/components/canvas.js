import React, { useState, useRef } from 'react';
import {SketchField, Tools} from 'react-sketch';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { navigate } from 'hookrouter';

/**
 * Canvas Component
 * 
 * @summary
 * this component is the canvas a user will sketch on.
 */
const Canvas = (props) => {
    const firestore = useFirestore();
    const _sketch = useRef(null);
    const gameId = useSelector(state => state.gameState.gameId);


    /** state for config of canvas
     * --- 
     * setConfig to change, im assuming will trigger a re-render?
     * need to read more into the docs, but its minimal :(
     */
    const [config, setConfig] = useState({
        color: 'black',
        lineWidth: 3
    });
    
    const undoPath = () => {
        _sketch.current.undo();
    }

    const redoPath = () => {
        _sketch.current.redo();
    }
    

    async function saveSketch() {
        let data = _sketch.current.toDataURL(); 
        if(props.isNextPart){
            firestore.collection('games').doc(gameId).update({[props.nextPart]: data});
            firestore.collection('games').doc(gameId).update({currentPart: props.nextPart});
            navigate('/');
        }
        else{
            firestore.collection('games').doc(gameId).update({[props.currentPart]: data});
            props.toggleNextPart();
        }
    }


    return (
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
                    lineWidth={config.lineWidth}
                />
                
                <button onClick={() => {undoPath()}}>Undo</button>
                <button onClick={() => {redoPath()}}>Redo</button>
                <button onClick={() => {saveSketch()}}>Save</button>
            </div>
    )
}

export default Canvas;
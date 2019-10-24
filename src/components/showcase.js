import React, {useRef, useEffect, useSelector} from 'react';
import {SketchField} from 'react-sketch';
import { useFirestore } from 'react-redux-firebase'

const Showcase = () => {
    // const gameId = useSelector(state => state.gameState.gameId);
    const firestore = useFirestore();
    const _sketch = useRef(null);
    const parts = ['head', 'torso', 'leftArm', 'rightArm', 'legs'];

    useEffect(() => {
        async function loadData(){
            let snap = await firestore.collection('games').doc('4wx0l').get();
            let head = snap.data().head;
            let torso = snap.data().torso;
            let leftArm = snap.data().leftArm;
            let rightArm = snap.data().rightArm;
            let legs = snap.data().legs;

            _sketch.current.addImg(head, {left: 100, top: 0, scale: 1/3});
            _sketch.current.addImg(torso, {left: 100, top: 100, scale: 1/3});
            _sketch.current.addImg(leftArm, {left: 0, top: 100, scale: 1/3});
            _sketch.current.addImg(rightArm, {left: 200, top: 100, scale: 1/3});
            _sketch.current.addImg(legs, {left: 100, top: 200, scale: 1/3});
        }
        loadData();
    })


    return (
        <div>
            <SketchField 
                ref={_sketch}
                className="canvas"
                width='300px' 
                height='300px' 
            />
        </div>
    )
}

export default Showcase;
import React, {useRef, useEffect} from 'react';
import {SketchField} from 'react-sketch';
import { useFirestore } from 'react-redux-firebase'

const Showcase = () => {
    const firestore = useFirestore();
    const _sketch = useRef(null);

    useEffect(() => {
        async function loadData(){
            let snap = await firestore.collection('games').doc('m1wn').get();
            let head = snap.data().head;
            let torso = snap.data().torso;
            _sketch.current.addImg(head, {left: 100, top: 0, scale: 1/3});
            _sketch.current.addImg(torso, {left: 100, top: 100, scale: 1/3});
            _sketch.current.addImg(head, {left: 0, top: 100, scale: 1/3});
            _sketch.current.addImg(head, {left: 200, top: 100, scale: 1/3});
            _sketch.current.addImg(head, {left: 200, top: 200, scale: 1/3});
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
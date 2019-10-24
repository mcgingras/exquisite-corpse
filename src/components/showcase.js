import React, {useRef, useEffect} from 'react';
import {SketchField} from 'react-sketch';
import { useFirestore } from 'react-redux-firebase'

const Showcase = () => {
    const firestore = useFirestore();
    const _sketch = useRef(null);

    useEffect(() => {
        async function loadData(){
            let snap = await firestore.collection('games').doc('cyx6p').get();
            let head = snap.data().head;
            _sketch.current.addImg(head, {left: 300, top: 0, scale: 1});
            _sketch.current.addImg(head, {left: 300, top: 300, scale: 1});
            _sketch.current.addImg(head, {left: 0, top: 300, scale: 1});
            _sketch.current.addImg(head, {left: 600, top: 300, scale: 1});
            _sketch.current.addImg(head, {left: 300, top: 600, scale: 1});
        }
        loadData();
    })


    return (
        <div>
            <SketchField 
                ref={_sketch}
                className="canvas"
                width='900px' 
                height='900px' 
            />
        </div>
    )
}

export default Showcase;
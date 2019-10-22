import React from 'react';
import {SketchField, Tools} from 'react-sketch';
import './App.css';

function App() {
  return (
    <div className="App">
      <SketchField width='1024px' 
              height='768px' 
              tool={Tools.Pencil} 
              lineColor='black'
              lineWidth={3}/>
    </div>
  );
}

export default App;

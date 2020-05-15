import React, { useState } from 'react';
import './App.css';
import Map from './map.js';
import Nav from './nav.js';

function App() {
  const [state, setState] = useState(false);

  //function to toggle feature layer
  function toggle() {
    setState(!state);
    // alert('toggle clicked');
  }
  return (
    <div className='App'>
      <div>
        <header className='App-header'>Coronavirus Project</header>
      </div>
      <div>
        <Nav toggle={toggle} />
      </div>
      <div className='esrimap'>
        <Map toggle={state} />
      </div>
    </div>
  );
}

export default App;

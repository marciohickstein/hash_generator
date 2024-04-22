import { useState, useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import HashComponent from './components/HashComponent';
import Base64Component from './components/Base64Component';
import 'bootstrap';

function App() {

  return (
    <div className='container text-center'>
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Hash Generator</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Base64</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
          <HashComponent></HashComponent>
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
          <Base64Component></Base64Component>
        </div>
      </div>

    </div>
  )
}

export default App

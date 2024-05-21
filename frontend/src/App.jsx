import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import HashComponent from './components/HashComponent';
import Base64Component from './components/Base64Component';
import UrlComponent from './components/UrlComponent';
import PortChecker from './components/PortChecker';

function App() {

  return (
    <div className='container text-center'>
      <ul className="nav nav-tabs justify-content-center" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button className="nav-link active" id="hash" data-bs-toggle="tab" data-bs-target="#hash-pane" type="button" role="tab" aria-controls="hash-pane" aria-selected="true">Hash Generator</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="base64-tab" data-bs-toggle="tab" data-bs-target="#base64-tab-pane" type="button" role="tab" aria-controls="base64-tab-pane" aria-selected="false">Base64</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="url-tab" data-bs-toggle="tab" data-bs-target="#url-tab-pane" type="button" role="tab" aria-controls="url-tab-pane" aria-selected="false">URL Encode/Decode</button>
        </li>
        <li className="nav-item" role="presentation">
          <button className="nav-link" id="port-checker-tab" data-bs-toggle="tab" data-bs-target="#port-checker-pane" type="button" role="tab" aria-controls="url-tab-pane" aria-selected="false">Port Checker</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="hash-pane" role="tabpanel" aria-labelledby="hash" tabIndex="0">
          <HashComponent></HashComponent>
        </div>
        <div className="tab-pane fade" id="base64-tab-pane" role="tabpanel" aria-labelledby="base64-tab" tabIndex="0">
          <Base64Component></Base64Component>
        </div>
        <div className="tab-pane fade" id="url-tab-pane" role="tabpanel" aria-labelledby="url-tab" tabIndex="0">
          <UrlComponent></UrlComponent>
        </div>
        <div className="tab-pane fade" id="port-checker-pane" role="tabpanel" aria-labelledby="url-tab" tabIndex="0">
          <PortChecker />
        </div>
      </div>

    </div>
  )
}

export default App

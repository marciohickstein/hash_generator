import 'bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import HashComponent from './components/HashComponent';
import Base64Component from './components/Base64Component';
import UrlComponent from './components/UrlComponent';
import PortChecker from './components/PortChecker';
import WhatsMyIp from './components/WhatsMyIp';

function App() {
  return (
    <>
      <header className="app-hero">
        <div className="container text-white">
          <div className="d-flex align-items-center gap-3 pb-3">
            <div
              className="d-flex align-items-center justify-content-center rounded-3 bg-white bg-opacity-10"
              style={{ width: 48, height: 48 }}
            >
              <i className="bi bi-tools fs-4"></i>
            </div>
            <div>
              <h1 className="mb-0 fw-bold" style={{ fontSize: '1.5rem' }}>Dev Tools</h1>
              <p className="mb-0 opacity-75" style={{ fontSize: '0.8rem' }}>Hash · Base64 · URL · Network</p>
            </div>
          </div>
        </div>
        <div className="app-nav-wrapper">
          <div className="container">
            <ul className="nav app-nav" id="mainTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#hash-pane" type="button" role="tab">
                  <i className="bi bi-hash me-1"></i>Hash
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#base64-tab-pane" type="button" role="tab">
                  <i className="bi bi-code-slash me-1"></i>Base64
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#url-tab-pane" type="button" role="tab">
                  <i className="bi bi-link-45deg me-1"></i>URL
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#port-checker-pane" type="button" role="tab">
                  <i className="bi bi-hdd-network me-1"></i>Port Checker
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" data-bs-toggle="tab" data-bs-target="#whatsmyip-pane" type="button" role="tab">
                  <i className="bi bi-globe me-1"></i>My IP
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="container py-4">
        <div className="tab-content" id="mainTabContent">
          <div className="tab-pane fade show active" id="hash-pane" role="tabpanel">
            <HashComponent />
          </div>
          <div className="tab-pane fade" id="base64-tab-pane" role="tabpanel">
            <Base64Component />
          </div>
          <div className="tab-pane fade" id="url-tab-pane" role="tabpanel">
            <UrlComponent />
          </div>
          <div className="tab-pane fade" id="port-checker-pane" role="tabpanel">
            <PortChecker />
          </div>
          <div className="tab-pane fade" id="whatsmyip-pane" role="tabpanel">
            <WhatsMyIp />
          </div>
        </div>
      </main>
    </>
  )
}

export default App;

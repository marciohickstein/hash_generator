import { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.css';

function App() {
  const [string, setString] = useState('');
  const [hash, setHash] = useState('');
  const [algo, setAlgo] = useState('md5');

  const changeString = (event) => {
    setString(event.target.value);
  }

  const generateHash = (event) => {
    (async () => {
      const response = await fetch(`http://localhost:3003/${algo}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ string })
      });

      const hashFromApi = await response.json();
      setHash(hashFromApi.hash);
    })()
  }

  const changeUpperCaseString = (event) => {
    let upperString = (event.target.checked) ? string.toUpperCase() : string.toLowerCase();

    setString(upperString);
  }

  const changeAlgorithm = (event) => {
    setAlgo(event.target.id);
  }

  return (
    <div className='container text-center'>
      <br />
      <br />
      <h2>Hash Generator</h2>
      <textarea name="string" id="string" cols="45" rows="10" value={string} onChange={changeString} ></textarea>
      <div className="row justify-content-center">
        <div className='col-3'>
          <fieldset>
            <div className="row justify-content-center">
              <div className="col-1">
                <input className="pl-5" type="radio" name="algo" id="md5" defaultChecked onClick={changeAlgorithm} />
              </div>
              <div className="col-2">
                <label htmlFor="md5">Md5</label>
              </div>
              <div className="col-1">
                <input type="radio" name="algo" id="sha1" onClick={changeAlgorithm} />
              </div>
              <div className="col-1">
                <label htmlFor="sha1">Sha1</label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="col-3">
          <input type="checkbox" name="uppercase" id="uppercase" onClick={changeUpperCaseString} />
          UpperCase

        </div>
      </div>

      <h4>HASH</h4>
      <textarea name="hash" id="hash" cols="45" rows="3" readOnly value={hash}></textarea>
      <br />
      <br />
      <button className="btn btn-primary" onClick={generateHash}>Generate</button>

    </div>

  )
}

export default App

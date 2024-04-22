import { useState, useEffect } from 'react'
import GenerateButton from './GenerateButton';

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function HashComponent() {
    const [string, setString] = useState('');
    const [hash, setHash] = useState('');
    const [algo, setAlgo] = useState('md5');
    const [uppercase, setUppercase] = useState(false);

    const changeString = (event) => {
        setString(event.target.value);
    }

    const generateHash = () => {
        if (!string) {
            return;
        }
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
        setUppercase(event.target.checked);
    }

    const changeAlgorithm = (event) => {
        setAlgo(event.target.value);
    }

    useEffect(() => {
        generateHash();
    }, [uppercase]);

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>Hash Generator</h2>
            <textarea name="string" id="string" cols="45" rows="10" value={string} onChange={changeString}></textarea>
            <div className="row justify-content-center">
                <div className='col-3'>
                    <select onChange={changeAlgorithm} onClick={generateHash} onKeyUp={generateHash}>
                        <option value="md5">Md5</option>
                        <option value="sha1">Sha1</option>
                        <option value="sha256">Sha256</option>
                        <option value="sha512">Sha512</option>
                    </select>
                </div>

                <div className="col-3">
                    <input type="checkbox" name="uppercase" id="uppercase" onClick={changeUpperCaseString} onKeyUp={generateHash} />
                    UpperCase

                </div>
            </div>

            <h4>HASH</h4>
            <textarea name="hash" id="hash" cols="45" rows="5" readOnly value={hash}></textarea>
            <br />
            <br />
            <GenerateButton title="Generate" parameter={algo} onClick={generateHash}></GenerateButton>

        </div>


    )
}

export default HashComponent;

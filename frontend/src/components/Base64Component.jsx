import { useState } from 'react'
import GenerateButton from './GenerateButton';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import { camelCase } from '../utils/Utils';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function Base64Component() {
    const [string, setString] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

    const changeString = (event) => {
        setString(event.target.value);
    }

    const encodeDecode = (event) => {
        (async () => {
            const response = await fetch(`http://localhost:3003/${operation}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ string })
            });

            const responseApi = await response.json();

            setStringProcessed(responseApi[operation]);
        })()
    }

    const changeOperation = (event) => {
        setOperation(event.target.value);
    }

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>Base64</h2>
            <h4>String to { camelCase(operation) }</h4>
            <textarea className="mb-2" name="string" id="string" cols="45" rows="10" value={string} onChange={changeString} ></textarea>
            <div className="row justify-content-center mb-2">
                <div className='col-3'>
                    <select onChange={changeOperation}>
                        <option value="encode">Encode</option>
                        <option value="decode">Decode</option>
                    </select>
                </div>
            </div>
            <h4>{ camelCase(operation) }d String</h4>
            <textarea name="hash" id="hash" cols="45" rows="5" readOnly value={stringProcessed}></textarea>
            <br />
            <br />
            <GenerateButton title={ camelCase(operation) } onClick={encodeDecode}></GenerateButton>

        </div>

    )
}

export default Base64Component;

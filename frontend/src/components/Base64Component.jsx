import { useState } from 'react'

import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function Base64Component() {
    const [string, setString] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

    const uppercase = (string) => {
        return string.toUpperCase();
    }

    const camelCase = (string) => {
        const array = string.split(' ');
        const arrayInCamelCase = array.map((w) => {
            const wordInCamelCase = w[0].toUpperCase() + w.slice(1).toLowerCase();

            return wordInCamelCase;
        })


        return arrayInCamelCase.join(' ');
    }

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
            <h2>{ camelCase(operation === OPER_ENCODE ? OPER_ENCODE : OPER_DECODE) }</h2>
            <textarea className="mb-2" name="string" id="string" cols="45" rows="10" value={string} onChange={changeString} ></textarea>
            <div className="row justify-content-center mb-2">
                <div className='col-3'>
                    <select onChange={changeOperation}>
                        <option value="encode">Encode</option>
                        <option value="decode">Decode</option>
                    </select>
                </div>
            </div>
            <h4>{ camelCase(operation === OPER_DECODE ? OPER_ENCODE : OPER_DECODE) }</h4>
            <textarea name="hash" id="hash" cols="45" rows="5" readOnly value={stringProcessed}></textarea>
            <br />
            <br />
            <button className="btn btn-secondary" onClick={encodeDecode}>Process</button>

        </div>

    )
}

export default Base64Component;

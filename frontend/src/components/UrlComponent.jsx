import { useState } from 'react'
import GenerateButton from './GenerateButton';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function UrlComponent() {
    const [string, setString] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

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
        const url = `http://localhost:3003/${operation}_url`;
        console.log(url);
        (async () => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ string })
            });

            const responseApi = await response.json();
console.log(responseApi)
            const result = operation === 'encode' ? responseApi.encodedUrl : responseApi.string;
            setStringProcessed(result);
        })()
    }

    const changeOperation = (event) => {
        setOperation(event.target.value);
    }

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>URL Encode / Decode</h2>
            <h4>{ camelCase(operation === OPER_ENCODE ? OPER_ENCODE : OPER_DECODE) }</h4>
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
            <GenerateButton title="Process" onClick={encodeDecode}></GenerateButton>

        </div>

    )
}

export default UrlComponent;

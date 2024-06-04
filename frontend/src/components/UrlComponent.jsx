import { useState } from 'react'
import GenerateButton from './GenerateButton';
import { camelCase, httpRequest } from '../utils/Utils';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function UrlComponent() {
    const [string, setString] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

    const changeString = (event) => {
        const newString = event.target.value;

        setString(newString);
    }

    const encodeDecode = async (event) => {
        const response = await httpRequest(window.location.hostname, 3003, operation + '_url', string);

        const result = operation === OPER_ENCODE ? response.encodedUrl : response.url;
        setStringProcessed(result);
    }

    const changeOperation = (event) => {
        setOperation(event.target.value);
    }

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>URL Encode / Decode</h2>
            <h4>URL to {camelCase(operation)}</h4>
            <textarea className="form-control mb-2" name="string" id="string" rows="10" value={string} onChange={changeString} ></textarea>
            <div className="row justify-content-center mb-2">
                <div className='col-3'>
                    <select onChange={changeOperation}>
                        <option value={OPER_ENCODE}>{camelCase(OPER_ENCODE)}</option>
                        <option value={OPER_DECODE}>{camelCase(OPER_DECODE)}</option>
                    </select>
                </div>
            </div>
            <h4>{camelCase(operation)}d URL</h4>
            <textarea name="hash" id="hash" className="form-control" rows="5" readOnly value={stringProcessed}></textarea>
            <br />
            <br />
            <GenerateButton title={camelCase(operation)} onClick={encodeDecode}></GenerateButton>
        </div>
    )
}

export default UrlComponent;

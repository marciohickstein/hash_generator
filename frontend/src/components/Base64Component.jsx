import { useState, useEffect } from 'react'
import GenerateButton from './GenerateButton';
import { camelCase, httpRequest } from '../utils/Utils';
import LoadFile from './LoadFile';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function Base64Component() {
    const [string, setString] = useState('');
    const [file, setFile] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

    const handleLoadFromFileBase64 = (fileName, contentOfFile) => {
        if (fileName && contentOfFile) {
            setString(contentOfFile);
            setFile(fileName);
        }
    }

    const changeString = (event) => {
        setString(event.target.value);
    }

    const encodeDecode = async (event) => {
        const response = await httpRequest(window.location.hostname, 3003, operation, string);
        if (response.error) {
            alert(response.message);
            setStringProcessed('');
            return;
        }
        setStringProcessed(response[operation]);
    }

    const changeOperation = (event) => {
        setOperation(event.target.value);
    }

    useEffect(() => {
        encodeDecode();
    }, [file])

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>Base64</h2>
            <h4>String to {camelCase(operation)}</h4>
            <textarea className="form-control mb-2" name="string" id="string" cols="45" rows="10" value={string} onChange={changeString} ></textarea>
            <div className="row justify-content-center">
                <div className="row justify-content-between mb-2">
                    <div className='col-6 mt-1'>
                        <select onChange={changeOperation}>
                            <option value={OPER_ENCODE}>{camelCase(OPER_ENCODE)}</option>
                            <option value={OPER_DECODE}>{camelCase(OPER_DECODE)}</option>
                        </select>
                    </div>

                    <div className="col-6">
                        <LoadFile name="loadFromFileBase64" onLoad={handleLoadFromFileBase64}></LoadFile>
                    </div>
                </div>
            </div>
            <h4>{camelCase(operation)}d String</h4>
            <textarea name="hash" id="hash" className="form-control" rows="5" readOnly value={stringProcessed}></textarea>
            <br />
            <br />
            <GenerateButton title={camelCase(operation)} onClick={encodeDecode}></GenerateButton>

        </div>

    )
}

export default Base64Component;

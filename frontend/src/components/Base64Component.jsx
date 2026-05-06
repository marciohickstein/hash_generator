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

    const changeString = (event) => setString(event.target.value);

    const encodeDecode = async () => {
        const response = await httpRequest(operation, string);
        if (response.error) {
            alert(response.message);
            setStringProcessed('');
            return;
        }
        setStringProcessed(response[operation]);
    }

    const changeOperation = (event) => setOperation(event.target.value);

    const copyToClipboard = () => {
        if (stringProcessed) navigator.clipboard.writeText(stringProcessed);
    }

    useEffect(() => {
        encodeDecode();
    }, [file])

    return (
        <div className="card tool-card">
            <div className="card-header d-flex align-items-center gap-2">
                <i className="bi bi-code-slash fs-5 text-primary"></i>
                <h5 className="mb-0 fw-semibold">Base64</h5>
            </div>
            <div className="card-body p-4">
                <div className="row g-3 mb-3 align-items-end">
                    <div className="col-sm-6">
                        <label className="section-label">Operation</label>
                        <select className="form-select" onChange={changeOperation}>
                            <option value={OPER_ENCODE}>{camelCase(OPER_ENCODE)}</option>
                            <option value={OPER_DECODE}>{camelCase(OPER_DECODE)}</option>
                        </select>
                    </div>
                    <div className="col-sm-6">
                        <LoadFile name="loadFromFileBase64" onLoad={handleLoadFromFileBase64} />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="section-label">Input — String to {camelCase(operation)}</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder={`Enter text to ${operation}...`}
                        value={string}
                        onChange={changeString}
                    />
                </div>

                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="section-label mb-0">{camelCase(operation)}d Output</label>
                        {stringProcessed && (
                            <button className="btn btn-sm btn-outline-secondary py-0" onClick={copyToClipboard}>
                                <i className="bi bi-clipboard me-1"></i>Copy
                            </button>
                        )}
                    </div>
                    <textarea
                        className="form-control output-area"
                        rows="4"
                        readOnly
                        value={stringProcessed}
                        placeholder="Result will appear here..."
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <GenerateButton title={camelCase(operation)} onClick={encodeDecode} />
                </div>
            </div>
        </div>
    )
}

export default Base64Component;

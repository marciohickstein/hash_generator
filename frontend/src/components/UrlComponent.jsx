import { useState } from 'react'
import GenerateButton from './GenerateButton';
import { camelCase, httpRequest } from '../utils/Utils';

const OPER_ENCODE = 'encode';
const OPER_DECODE = 'decode';

function UrlComponent() {
    const [string, setString] = useState('');
    const [operation, setOperation] = useState(OPER_ENCODE);
    const [stringProcessed, setStringProcessed] = useState('');

    const changeString = (event) => setString(event.target.value);

    const encodeDecode = async () => {
        const response = await httpRequest(window.location.hostname, 3003, operation + '_url', string);
        const result = operation === OPER_ENCODE ? response.encodedUrl : response.url;
        setStringProcessed(result);
    }

    const changeOperation = (event) => setOperation(event.target.value);

    const copyToClipboard = () => {
        if (stringProcessed) navigator.clipboard.writeText(stringProcessed);
    }

    return (
        <div className="card tool-card">
            <div className="card-header d-flex align-items-center gap-2">
                <i className="bi bi-link-45deg fs-5 text-primary"></i>
                <h5 className="mb-0 fw-semibold">URL Encode / Decode</h5>
            </div>
            <div className="card-body p-4">
                <div className="mb-3">
                    <label className="section-label">Operation</label>
                    <select className="form-select w-auto" onChange={changeOperation}>
                        <option value={OPER_ENCODE}>{camelCase(OPER_ENCODE)}</option>
                        <option value={OPER_DECODE}>{camelCase(OPER_DECODE)}</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="section-label">URL to {camelCase(operation)}</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Enter URL or string..."
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

export default UrlComponent;

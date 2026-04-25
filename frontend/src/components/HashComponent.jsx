import { useState, useEffect } from 'react'
import GenerateButton from './GenerateButton';
import LoadFile from './LoadFile';
import { httpRequest } from '../utils/Utils';

function HashComponent() {
    const [string, setString] = useState('');
    const [originalString, setOriginalString] = useState('');
    const [hash, setHash] = useState('');
    const [algo, setAlgo] = useState('md5');
    const [uppercase, setUppercase] = useState(false);
    const [file, setFile] = useState('');

    const changeString = (event) => setString(event.target.value);

    const handleLoadFromFile = (fileName, contentOfFile) => {
        if (fileName && contentOfFile) {
            setString(contentOfFile);
            setFile(fileName);
        }
    }

    const generateHash = async () => {
        if (!string) {
            setHash('');
            return;
        }
        const response = await httpRequest(window.location.hostname, 3003, algo, string);
        if (response.error) {
            alert(response.message);
            setHash('');
            return;
        }
        setHash(response.hash);
    }

    const changeUpperCaseString = (event) => {
        const upperString = event.target.checked ? string.toUpperCase() : originalString;
        setOriginalString(string);
        setString(upperString);
        setUppercase(event.target.checked);
    }

    const changeAlgorithm = (event) => setAlgo(event.target.value);

    const copyToClipboard = () => {
        if (hash) navigator.clipboard.writeText(hash);
    }

    useEffect(() => {
        generateHash();
    }, [uppercase, file, algo]);

    return (
        <div className="card tool-card">
            <div className="card-header d-flex align-items-center gap-2">
                <i className="bi bi-hash fs-5 text-primary"></i>
                <h5 className="mb-0 fw-semibold">Hash Generator</h5>
            </div>
            <div className="card-body p-4">
                <div className="mb-3">
                    <label className="section-label">Input</label>
                    <textarea
                        className="form-control"
                        rows="6"
                        placeholder="Enter text to hash..."
                        value={string}
                        onChange={changeString}
                    />
                </div>

                <div className="row g-3 mb-4 align-items-end">
                    <div className="col-sm-4">
                        <label className="section-label">Algorithm</label>
                        <select className="form-select" onChange={changeAlgorithm}>
                            <option value="md5">MD5</option>
                            <option value="sha1">SHA-1</option>
                            <option value="sha256">SHA-256</option>
                            <option value="sha512">SHA-512</option>
                        </select>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-check mb-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="uppercase"
                                onClick={changeUpperCaseString}
                            />
                            <label className="form-check-label" htmlFor="uppercase">Uppercase input</label>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <LoadFile name="loadFromFileHash" uppercase={uppercase} onLoad={handleLoadFromFile} />
                    </div>
                </div>

                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <label className="section-label mb-0">Hash Output</label>
                        {hash && (
                            <button className="btn btn-sm btn-outline-secondary py-0" onClick={copyToClipboard}>
                                <i className="bi bi-clipboard me-1"></i>Copy
                            </button>
                        )}
                    </div>
                    <textarea
                        className="form-control output-area"
                        rows="3"
                        readOnly
                        value={hash}
                        placeholder="Hash will appear here..."
                    />
                </div>

                <div className="d-flex justify-content-end">
                    <GenerateButton title="Generate Hash" parameter={algo} onClick={generateHash} />
                </div>
            </div>
        </div>
    )
}

export default HashComponent;

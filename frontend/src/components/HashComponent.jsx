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

    const changeString = (event) => {
        setString(event.target.value);
    }

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
        let upperString = (event.target.checked) ? string.toUpperCase() : originalString;

        setOriginalString(string);
        setString(upperString);
        setUppercase(event.target.checked);
    }

    const changeAlgorithm = (event) => {
        setAlgo(event.target.value);
    }

    useEffect(() => {
        generateHash();
    }, [uppercase, file, algo]);

    return (
        <div className='container text-center'>
            <br />
            <br />
            <h2>Hash Generator</h2>
            <textarea name="string" id="string" className="form-control" rows="10" value={string} onChange={changeString}></textarea>
            <br />
            <div className="row justify-content-around">
                <div className="row justify-content-around">
                    <div className='col-4 mt-1'>
                        <select onChange={changeAlgorithm}>
                            <option value="md5">Md5</option>
                            <option value="sha1">Sha1</option>
                            <option value="sha256">Sha256</option>
                            <option value="sha512">Sha512</option>
                        </select>
                    </div>

                    <div className="col-4 mt-1">
                        <input type="checkbox" name="uppercase" id="uppercase" onClick={changeUpperCaseString} />
                        UpperCase
                    </div>

                    <div className="col-4">
                        <LoadFile name="loadFromFileHash" uppercase={uppercase} onLoad={handleLoadFromFile}></LoadFile>
                    </div>
                </div>
            </div>
            <h4>HASH</h4>
            <textarea name="hash" id="hash" className="form-control" rows="5" readOnly value={hash}></textarea>
            <br />
            <br />
            <GenerateButton title="Generate" parameter={algo} onClick={generateHash}></GenerateButton>

        </div>


    )
}

export default HashComponent;

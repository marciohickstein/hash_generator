import { useState, useEffect } from 'react';
import { httpRequest } from '../utils/Utils';

const PortChecker = ({ }) => {

    const [ statusPort, setStatusPort ] = useState('');
    const [ port, setPort ] = useState(0);
    const [ address, setAddress ] = useState('');
    
    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://ipinfo.io/ip');
                const ip = await response.text();

                setAddress(ip);
            } catch (error) {
                setAddress('');
            }
        })()
    }, []);

    const changeAddress = (event) => {
        console.log('change address')
        setAddress(event.target.value);
    }

    const changePort = (event) => {
        console.log('change port')
        setPort(event.target.value);
    }

    const checkPort = async () => {
        const hostPort = `${address}:${port}`;
        const response = await httpRequest(window.location.hostname, 3003, 'connect', hostPort);

        const status = response.success === true ? `Port ${port} is opened` : `Port ${port} is closed`;
        console.log(response)
        setStatusPort(status);
    }

    return (
        <>
            <div className="container">
                <br />
                <br />
                <h2>Port Checker</h2>
                <small>Check for open ports and verify port forwarding setup on your router.</small>
                <br />
                <br />
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Your IP Address: </label>
                    <input type="text" className="form-control" name="address" id="address" onCopy={changeAddress} onChange={changeAddress} defaultValue={''} />
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Port Number: </label>
                    <input type="text" className="form-control" name="port" id="port" onCopy={changePort} onChange={changePort}/>
                </div>
                <div className="mb-3">
                    <button className="btn btn-secondary" onClick={checkPort}>Check</button>
                </div>

                <p>
                    {statusPort}
                </p>
            </div >
        </>
    )
}

export default PortChecker;
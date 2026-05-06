import { useState, useEffect } from 'react';
import { httpRequest } from '../utils/Utils';

const PortChecker = () => {
    const [statusPort, setStatusPort] = useState('');
    const [isOpen, setIsOpen] = useState(null);
    const [port, setPort] = useState('');
    const [address, setAddress] = useState('');
    const [checking, setChecking] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('http://ipinfo.io/ip');
                const ip = await response.text();
                setAddress(ip.trim());
            } catch {
                setAddress('');
            }
        })()
    }, []);

    const changeAddress = (event) => setAddress(event.target.value);
    const changePort = (event) => setPort(event.target.value);

    const checkPort = async () => {
        setChecking(true);
        setStatusPort('');
        setIsOpen(null);
        const hostPort = `${address}:${port}`;
        const response = await httpRequest('connect', hostPort);
        const open = response.success === true;
        setIsOpen(open);
        setStatusPort(open ? `Port ${port} is open` : `Port ${port} is closed`);
        setChecking(false);
    }

    return (
        <div className="card tool-card">
            <div className="card-header d-flex align-items-center gap-2">
                <i className="bi bi-hdd-network fs-5 text-primary"></i>
                <h5 className="mb-0 fw-semibold">Port Checker</h5>
            </div>
            <div className="card-body p-4">
                <p className="text-secondary mb-4">Check if a port is open and verify port forwarding on your router.</p>

                <div className="row g-3 mb-4">
                    <div className="col-sm-8">
                        <label className="section-label">IP Address or Hostname</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. 192.168.1.1"
                            value={address}
                            onChange={changeAddress}
                        />
                    </div>
                    <div className="col-sm-4">
                        <label className="section-label">Port Number</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="e.g. 8080"
                            value={port}
                            onChange={changePort}
                        />
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3 flex-wrap">
                    <button
                        className="btn btn-primary"
                        onClick={checkPort}
                        disabled={checking || !address || !port}
                    >
                        {checking
                            ? <><span className="spinner-border spinner-border-sm me-2" role="status" />Checking...</>
                            : <><i className="bi bi-search me-2" />Check Port</>
                        }
                    </button>

                    {statusPort && (
                        <span className={`badge rounded-pill fs-6 px-3 py-2 ${isOpen ? 'bg-success' : 'bg-danger'}`}>
                            <i className={`bi ${isOpen ? 'bi-check-circle' : 'bi-x-circle'} me-1`}></i>
                            {statusPort}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PortChecker;

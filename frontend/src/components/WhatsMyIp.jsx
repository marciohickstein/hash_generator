import { useState, useEffect } from 'react';
import { httpGetRequest, BACKEND_HOST } from '../utils/Utils';

const WhatsMyIp = () => {
    const [externalIp, setExternalIp] = useState('');
    const [network, setNetwork] = useState({});
    const [loading, setLoading] = useState(true);

    const getNetwork = async () => {
        return await httpGetRequest(BACKEND_HOST, 3003, 'lan', '');
    }

    const getExternalIp = async () => {
        const response = await httpGetRequest(BACKEND_HOST, 3003, 'externalip', '');
        return response.ip;
    }

    const getAddressRow = (addr, idx, inter) => {
        const key = `${inter}:${idx}`;
        return (
            <tr key={key}>
                <td className="text-secondary fw-medium">
                    {inter} <span className="badge bg-secondary ms-1">{idx}</span>
                </td>
                <td><code>{addr.address}</code></td>
                <td><code>{addr.cidr}</code></td>
                <td>
                    <span className={`badge ${addr.family === 'IPv4' ? 'bg-primary' : 'bg-info text-dark'}`}>
                        {addr.family}
                    </span>
                </td>
                <td><code className="text-secondary">{addr.netmask}</code></td>
                <td><code className="text-secondary">{addr.mac}</code></td>
                <td>
                    {addr.internal
                        ? <span className="badge bg-warning text-dark">Internal</span>
                        : <span className="badge bg-success">External</span>
                    }
                </td>
            </tr>
        )
    }

    useEffect(() => {
        (async () => {
            try {
                const [ip, net] = await Promise.all([getExternalIp(), getNetwork()]);
                setExternalIp(ip);
                setNetwork(net);
            } catch {
                setExternalIp('');
                setNetwork({});
            } finally {
                setLoading(false);
            }
        })()
    }, []);

    return (
        <div className="d-flex flex-column gap-4">
            <div className="card tool-card">
                <div className="card-header d-flex align-items-center gap-2">
                    <i className="bi bi-globe fs-5 text-primary"></i>
                    <h5 className="mb-0 fw-semibold">What's My IP</h5>
                </div>
                <div className="card-body p-4">
                    <p className="text-secondary mb-3">Your external IP address and local network interfaces.</p>
                    <label className="section-label">External IP</label>
                    {loading
                        ? <div className="placeholder-glow"><span className="placeholder col-3 rounded" /></div>
                        : <div className="d-flex align-items-center gap-2">
                            <span className="fs-3 fw-bold font-monospace text-primary">{externalIp || '—'}</span>
                            {externalIp && (
                                <button
                                    className="btn btn-sm btn-outline-secondary py-0"
                                    onClick={() => navigator.clipboard.writeText(externalIp)}
                                    title="Copy IP"
                                >
                                    <i className="bi bi-clipboard"></i>
                                </button>
                            )}
                        </div>
                    }
                </div>
            </div>

            <div className="card tool-card">
                <div className="card-header d-flex align-items-center gap-2">
                    <i className="bi bi-diagram-3 fs-5 text-primary"></i>
                    <h5 className="mb-0 fw-semibold">Network Interfaces</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Interface</th>
                                    <th>Address</th>
                                    <th>CIDR</th>
                                    <th>Family</th>
                                    <th>Netmask</th>
                                    <th>MAC</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading
                                    ? <tr><td colSpan="7" className="text-center py-4 text-secondary">
                                        <span className="spinner-border spinner-border-sm me-2" />Loading...
                                      </td></tr>
                                    : Object.keys(network).length === 0
                                        ? <tr><td colSpan="7" className="text-center py-4 text-secondary">No data available</td></tr>
                                        : Object.entries(network).map(([key, value]) =>
                                            value ? value.map((a, i) => getAddressRow(a, i, key)) : null
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhatsMyIp;

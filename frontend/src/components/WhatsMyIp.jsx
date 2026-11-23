import { useState, useEffect } from 'react';
import { httpGetRequest } from '../utils/Utils';

const WhatsMyIp = () => {
    const [externalIp, setExternalIp] = useState('');
    const [loading, setLoading] = useState(true);

    const getExternalIp = async () => {
        const response = await httpGetRequest('externalip');
        return response.ip;
    }

    useEffect(() => {
        (async () => {
            try {
                setExternalIp(await getExternalIp());
            } catch {
                setExternalIp('');
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
                    <h5 className="mb-0 fw-semibold">What&apos;s My IP</h5>
                </div>
                <div className="card-body p-4">
                    <p className="text-secondary mb-3">Your external IP address.</p>
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
        </div>
    );
}

export default WhatsMyIp;

import { useState, useEffect } from 'react';
import { httpGetRequest } from '../utils/Utils';

const WhatsMyIp = ({ }) => {

    const [externalIp, setExternalIp] = useState('');
    const [network, setNetwork] = useState('');

    const getNetwork = async () => {
        const response = await httpGetRequest(window.location.hostname, 3003, 'lan', '');
        return response;
    }

    const getExternalIp = async () => {
        const response = await httpGetRequest(window.location.hostname, 3003, 'externalip', '');
        return response.ip;
    }

    const getAddress = (addr, idx, inter) => {
        const key = `${inter}: ${idx}`;

        return (
            <tr key={key}>
                <th scope="row">{key}</th>
                <td>{addr.address}</td>
                <td>{addr.cidr}</td>
                <td>{addr.family}</td>
                <td>{addr.netmask}</td>
                <td>{addr.mac}</td>
                <td>{new String(addr.internal)}</td>
            </tr>
        )
    }

    useEffect(() => {
        (async () => {
            try {
                setExternalIp(await getExternalIp());
                setNetwork(await getNetwork());
            } catch (error) {
                setExternalIp('');
                setNetwork('');
            }
        })()
    }, []);

    return (
        <>
            <div className="container">
                <br />
                <br />
                <h2>Whas My IP</h2>
                <small>Show my external IP and my local network.</small>
                <br />
                <br />
                <h2>My External IP</h2>
                <br />
                <h4><b>{externalIp}</b></h4>
                <br />
                <br />
                <h2>Network</h2>
                <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Family</th>
                            <th scope="col">Address</th>
                            <th scope="col">Cidr</th>
                            <th scope="col">NetMask</th>
                            <th scope="col">Mac</th>
                            <th scope="col">Internal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(network).map(([key, value]) => (
                            value ? value.map((a, i) => getAddress(a, i, key)) : <tr key={key}><td>_</td></tr>
                        ))}
                    </tbody>
                </table>
                <br />
            </div >
        </>
    )
}

export default WhatsMyIp;
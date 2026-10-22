import { useState } from 'react';

const CATEGORIES = [
    { prefix: '1', label: '1xx Informational', badge: 'bg-info text-dark' },
    { prefix: '2', label: '2xx Success', badge: 'bg-success' },
    { prefix: '3', label: '3xx Redirection', badge: 'bg-primary' },
    { prefix: '4', label: '4xx Client Error', badge: 'bg-warning text-dark' },
    { prefix: '5', label: '5xx Server Error', badge: 'bg-danger' },
];

const STATUS_CODES = [
    [100, 'Continue', 'The server has received the request headers and the client should proceed to send the request body.'],
    [101, 'Switching Protocols', 'The server is switching protocols as requested by the client (e.g. to WebSocket).'],
    [102, 'Processing', 'The server has received and is processing the request, but no response is available yet (WebDAV).'],
    [103, 'Early Hints', 'Used to return some response headers before the final response, e.g. for preloading resources.'],
    [200, 'OK', 'The request succeeded.'],
    [201, 'Created', 'The request succeeded and a new resource was created.'],
    [202, 'Accepted', 'The request has been accepted for processing, but processing has not been completed.'],
    [203, 'Non-Authoritative Information', 'The returned metadata is from a local or third-party copy, not the origin server.'],
    [204, 'No Content', 'The request succeeded and there is no content to send in the response body.'],
    [205, 'Reset Content', 'Tells the client to reset the document view that sent the request.'],
    [206, 'Partial Content', 'The server is delivering only part of the resource due to a Range header.'],
    [207, 'Multi-Status', 'Conveys information about multiple resources where multiple status codes may apply (WebDAV).'],
    [208, 'Already Reported', 'Members of a DAV binding have already been enumerated in a previous reply (WebDAV).'],
    [226, 'IM Used', 'The server fulfilled a GET request with instance-manipulations applied to the current instance.'],
    [300, 'Multiple Choices', 'The request has more than one possible response; the client should choose one.'],
    [301, 'Moved Permanently', 'The resource has been permanently moved to the URL given in the Location header.'],
    [302, 'Found', 'The resource is temporarily located at a different URL.'],
    [303, 'See Other', 'The client should get the resource at another URL using a GET request.'],
    [304, 'Not Modified', 'The resource has not been modified since the version cached by the client.'],
    [305, 'Use Proxy', 'Deprecated. The resource must be accessed through a proxy.'],
    [307, 'Temporary Redirect', 'The resource is temporarily at another URL; the method and body must not change.'],
    [308, 'Permanent Redirect', 'The resource is permanently at another URL; the method and body must not change.'],
    [400, 'Bad Request', 'The server cannot process the request due to a client error (e.g. malformed syntax).'],
    [401, 'Unauthorized', 'Authentication is required and has failed or has not been provided.'],
    [402, 'Payment Required', 'Reserved for future use; sometimes used by payment or quota systems.'],
    [403, 'Forbidden', 'The client is authenticated but does not have permission to access the resource.'],
    [404, 'Not Found', 'The server cannot find the requested resource.'],
    [405, 'Method Not Allowed', 'The request method is not supported for the target resource.'],
    [406, 'Not Acceptable', 'No content matches the criteria given in the Accept headers.'],
    [407, 'Proxy Authentication Required', 'The client must first authenticate itself with the proxy.'],
    [408, 'Request Timeout', 'The server timed out waiting for the request.'],
    [409, 'Conflict', 'The request conflicts with the current state of the resource.'],
    [410, 'Gone', 'The resource is no longer available and will not be available again.'],
    [411, 'Length Required', 'The server requires a Content-Length header.'],
    [412, 'Precondition Failed', 'One or more preconditions in the request headers evaluated to false.'],
    [413, 'Content Too Large', 'The request body is larger than the server is willing or able to process.'],
    [414, 'URI Too Long', 'The URI requested by the client is longer than the server is willing to interpret.'],
    [415, 'Unsupported Media Type', 'The media format of the request body is not supported.'],
    [416, 'Range Not Satisfiable', 'The range specified in the Range header cannot be fulfilled.'],
    [417, 'Expectation Failed', 'The expectation given in the Expect header cannot be met.'],
    [418, "I'm a teapot", 'The server refuses to brew coffee because it is a teapot (RFC 2324, April Fools).'],
    [421, 'Misdirected Request', 'The request was directed at a server that is not able to produce a response.'],
    [422, 'Unprocessable Content', 'The request is well-formed but contains semantic errors.'],
    [423, 'Locked', 'The resource being accessed is locked (WebDAV).'],
    [424, 'Failed Dependency', 'The request failed because it depended on another request that failed (WebDAV).'],
    [425, 'Too Early', 'The server is unwilling to process a request that might be replayed.'],
    [426, 'Upgrade Required', 'The client should switch to a different protocol, given in the Upgrade header.'],
    [428, 'Precondition Required', 'The server requires the request to be conditional.'],
    [429, 'Too Many Requests', 'The client has sent too many requests in a given amount of time (rate limiting).'],
    [431, 'Request Header Fields Too Large', 'The request header fields are too large.'],
    [451, 'Unavailable For Legal Reasons', 'The resource cannot be provided for legal reasons, e.g. censorship.'],
    [500, 'Internal Server Error', 'The server encountered an unexpected condition that prevented it from fulfilling the request.'],
    [501, 'Not Implemented', 'The server does not support the functionality required to fulfill the request.'],
    [502, 'Bad Gateway', 'The server, acting as a gateway or proxy, received an invalid response from upstream.'],
    [503, 'Service Unavailable', 'The server is temporarily unable to handle the request (overload or maintenance).'],
    [504, 'Gateway Timeout', 'The server, acting as a gateway or proxy, did not get a response in time from upstream.'],
    [505, 'HTTP Version Not Supported', 'The HTTP version used in the request is not supported by the server.'],
    [506, 'Variant Also Negotiates', 'The server has an internal configuration error in content negotiation.'],
    [507, 'Insufficient Storage', 'The server is unable to store the representation needed to complete the request (WebDAV).'],
    [508, 'Loop Detected', 'The server detected an infinite loop while processing the request (WebDAV).'],
    [510, 'Not Extended', 'Further extensions to the request are required for the server to fulfill it.'],
    [511, 'Network Authentication Required', 'The client needs to authenticate to gain network access (e.g. captive portal).'],
].map(([code, name, description]) => ({ code, name, description }));

const HttpStatusCodes = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const term = search.trim().toLowerCase();
    const filtered = STATUS_CODES.filter(s =>
        (!category || String(s.code).startsWith(category)) &&
        (!term ||
            String(s.code).includes(term) ||
            s.name.toLowerCase().includes(term) ||
            s.description.toLowerCase().includes(term))
    );

    return (
        <div className="card tool-card">
            <div className="card-header d-flex align-items-center gap-2">
                <i className="bi bi-list-ol fs-5 text-primary"></i>
                <h5 className="mb-0 fw-semibold">HTTP Status Codes</h5>
            </div>
            <div className="card-body p-4">
                <p className="text-secondary mb-3">Reference of all standard HTTP response status codes.</p>
                <div className="row g-2 mb-3">
                    <div className="col-md-8">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search by code, name or description..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={category} onChange={e => setCategory(e.target.value)}>
                            <option value="">All categories</option>
                            {CATEGORIES.map(c => <option key={c.prefix} value={c.prefix}>{c.label}</option>)}
                        </select>
                    </div>
                </div>

                {filtered.length === 0 && <p className="text-center py-4 text-secondary mb-0">No status codes found</p>}

                {CATEGORIES.map(c => {
                    const codes = filtered.filter(s => String(s.code).startsWith(c.prefix));
                    if (codes.length === 0) return null;
                    return (
                        <div key={c.prefix} className="mb-4">
                            <label className="section-label">{c.label}</label>
                            <div className="table-responsive">
                                <table className="table table-hover mb-0">
                                    <tbody>
                                        {codes.map(s => (
                                            <tr key={s.code}>
                                                <td style={{ width: 80 }}>
                                                    <span className={`badge font-monospace fs-6 ${c.badge}`}>{s.code}</span>
                                                </td>
                                                <td className="fw-medium text-nowrap">{s.name}</td>
                                                <td className="text-secondary">{s.description}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HttpStatusCodes;

import { useEffect } from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function GenerateButton({ title, parameter, onClick }) {
    return (
        <button className="btn btn-secondary" onClick={() => onClick(parameter)}>{title}</button>
    )
}

export default GenerateButton;
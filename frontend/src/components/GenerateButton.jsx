function GenerateButton({ title, parameter, onClick }) {
    return (
        <button className="btn btn-primary" onClick={() => onClick(parameter)}>
            <i className="bi bi-play-fill me-2"></i>{title}
        </button>
    )
}

export default GenerateButton;

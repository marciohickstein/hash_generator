function LoadFile({ name, onLoad, uppercase, title }) {

    const onLoadFromFile = (event) => {
        let fileName = '';
        let contentOfFile = '';

        if (event.target.files.length <= 0) {
            onLoad(fileName, contentOfFile);
            return;
        }

        const file = event.target.files[0];
        const fileReader = new FileReader();

        fileReader.onload = (event) => {
            fileName = file.name;
            contentOfFile = uppercase ? event.target.result.toLocaleUpperCase() : event.target.result;
            onLoad(fileName, contentOfFile);
        }

        fileReader.readAsText(file);
    }

    return (
        <>
            <label className="btn btn-outline-secondary" htmlFor={name || 'loadFromFile'}>
                <i className="bi bi-file-earmark-text me-2"></i>
                {title || 'Load File'}
            </label>
            <input
                type="file"
                name={name || 'loadFromFile'}
                id={name || 'loadFromFile'}
                onChange={onLoadFromFile}
                style={{ display: 'none' }}
                accept="text/plain"
            />
        </>
    )
}

export default LoadFile;

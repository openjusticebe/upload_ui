import React, { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

export default ({value, update, onChange, style}) => {
    const editorRef = React.createRef();

    useEffect(() => { 
        console.log('grabbing editor');
        editorRef.current.getEditor().setText(update);
    }, [update]);

    return (
        <div style={{ height: "100%" }}>
            <ReactQuill
                theme="snow"
                ref= { editorRef }
                value={ value }
                onChange={ onChange }
                style= { style }
            />
        </div>
    )
}


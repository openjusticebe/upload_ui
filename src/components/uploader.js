import React from "react";
import Dropzone from 'react-dropzone'

export default ({ parentCallback }) => {
    const handleFiles = (files) => {
        var payload = new FormData();
        payload.append('rawFile', files[0]);

        fetch(`${process.env.GATSBY_API_URL}/extract/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: payload
        }).then(
            response => response.json()
        ).then( success => {
            parentCallback(success.markdown);
        }).catch(
            error => console.log(error)
        );
    }

    return (
        <div className="uploader btn btn-primary my-2">
            <Dropzone onDrop={acceptedFiles => handleFiles(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Cliquez ici pour charger un fichier<br/>Klik hier om een bestand te uploaden</p>
                  </div>
                </section>
              )}
            </Dropzone>
        </div>
    )
}

import React from "react";
import Dropzone from 'react-dropzone'
import LoadGif from '../images/hourglass.gif';

export default ({ parentCallback }) => {

    let waiting = false;

    const handleFiles = (files) => {
        var payload = new FormData();
        waiting = true;
        console.log(waiting);
        payload.append('rawFile', files[0]);

        fetch(`${process.env.GATSBY_UPLOAD_API}/extract/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: payload
        }).then(
            response => response.json()
        ).then( success => {
            parentCallback(true, success.markdown);
            waiting = false;
        }).catch(
            error => {
                parentCallback(false, error.toString());
                waiting = false;
                }
        );
    }

    return (
        <div className="uploader btn btn-primary my-2">
            <Dropzone onDrop={acceptedFiles => handleFiles(acceptedFiles)}>
              {({getRootProps, getInputProps}) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                      { waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                    <p>Cliquez ici pour charger un fichier<br/>Klik hier om een bestand te uploaden</p>
                  </div>
                </section>
              )}
            </Dropzone>
        </div>
    )
}

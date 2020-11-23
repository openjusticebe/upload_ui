import React from "react";
import Dropzone from 'react-dropzone'
import LoadGif from '../images/hourglass.gif';
import { useTranslation } from 'react-i18next';

export default ({ parentCallback, metaCallback }) => {
    const { t, i18n } = useTranslation()
    let waiting = false;

    const handleFiles = (files) => {
        var payload = new FormData();
        waiting = true;
        payload.append('rawFile', files[0]);

        fetch(`${process.env.GATSBY_UPLOAD_API}/fileinfo/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: payload
        }).then(
            response => response.json()
        ).then( data => {
            // check if content is good
            const hasLang = data.language != '';
            const hasText = data.charstotal > 10;
            let doOCR = 0;

            if (!hasLang || !hasText) {
                doOCR = 1;
            }

            metaCallback(data, doOCR == 0 ? false : true);

            return fetch(`${process.env.GATSBY_UPLOAD_API}/extract/?ocr=${doOCR}`, {
                method: 'POST',
                headers: {
                    'Accept': 'text/plain',
                },
                body: payload
            });
        }).then(
            response => response.text()
        ).then( response => {
            parentCallback(true, response);
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
                        { t('form.select_file')}
                  </div>
                </section>
              )}
            </Dropzone>
        </div>
    )
}

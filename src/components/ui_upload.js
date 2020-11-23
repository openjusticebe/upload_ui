import React from "react";
import Uploader from "../components/uploader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';
import { withTranslation, useTranslation } from 'react-i18next';

const FileInfo = ({ meta, degraded }) => {
    const { t } = useTranslation()
    return (
    <div>
        { degraded &&
        <div>
            <h3 className="warning">Degraded</h3>
            <p>{ t('form.image_pdf_detected') }</p>
        </div>
        }
        <div>
            <dl>
                <dd>{ t('characters') }</dd>
                <dt>{ meta.charstotal || '0' }</dt>
                <dd>{ t('pages') }</dd>
                <dt>{ meta.pages || '0' }</dt>
                <dd>{ t('languages') }</dd>
                <dt>{ meta.language || '0' }</dt>
            </dl>
        </div>
    </div>
    )
    };


class UploadUi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Copy-Paste',
            uploaded :  'Copy-Paste',
            res_text: {__html: '(Result zone)' },
            log_text: {__html: '' },
            file_meta: false,
            isDegraded: false,
            waiting: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextExtract = this.handleTextExtract.bind(this);
        this.handleTextMeta = this.handleTextMeta.bind(this);
        this.handleCallback = props.TextHandler;
    }

    logDisplay(loglines) {
        return loglines.join("\n<br />");
    }

    handleTextMeta(meta, degraded=false) {
        this.setState({
            file_meta: meta,
            isDegraded: degraded
        });
    }

    handleTextExtract(success, text) {
        if (success) {
            this.setState({
                text: text
                //uploaded: text
            });
        } else {
            this.setState({
                error: `Erreur d'extraction, Extractiefout: ${text}`
            });
        }
    }

    handleTextChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    handleSubmit(event) {
        this.setState({waiting: true})
        event.preventDefault();

        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
            'algo_list' : [{'id':'anon_trazor', 'params':"{}"}],
            'format': 'text',
            'encoding': 'utf8',
            'text': this.state.text,
            'error': false,
            'anon_log': false
        }

        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_UPLOAD_API}/parse`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
        }).then(response => response.json()
        ).then(resultData => {
                if ('error' in resultData.log)
                    {
                    const msg = `Erreur de traitement, Verwerkingsfout: ${resultData.log.error}`;
                    this.setState({'anon_log' : {__html: msg}});
                    this.handleCallback(false, '', {log_text: msg});
                    }
                else
                    {
                    this.handleCallback(this.state.text, resultData.entities,  {log_text: this.logDisplay(resultData.log.lines)});
                    this.setState({'anon_log' : {__html: this.logDisplay(resultData.log.lines)}});
                    }
                this.setState({waiting: false})
        }).catch(error => {
            const msg = `Erreur de serveur, Server fout: ${error.toString()}`;
            this.setState({'anon_log' : {__html: msg}});
            this.handleCallback(false, '', {log_text: msg});
            this.setState({waiting: false});
        });
    }


    render() {
        const { t } = this.props;
        return (
            <div className="col-12 shadow rounded border py-3 my-3">
                <h2>1) {t('form_title.upload_content')} </h2>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <Uploader
                            parentCallback={ this.handleTextExtract }
                            metaCallback={ this.handleTextMeta }
                        />
                    </div>
                </div>
                { this.state.file_meta && 
                <div className="row justify-content-center">
                    <div className="col-8">
                        <FileInfo meta={ this.state.file_meta } degraded={ this.state.isDegraded } />
                    </div>
                </div>
                }

                
                <div className="row justify-content-center">
                    { this.state.error &&
                        <div className="log col-10 bg-info">
                            { this.state.error }
                        </div>
                    }
                </div>
                <div className="row justify-content-center">
                    <textarea
                        id="content_raw"
                        update={ this.state.uploaded }
                        onChange={ this.handleTextChange }
                        value ={ this.state.text }
                        className="col-10"
                        />
                </div>
                <div className="row justify-content-center mt-3">
                    <Form onSubmit={ this.handleSubmit } className="pl-3">
                      <Button variant="primary" type="submit">
                      { this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" /> }
                      {t('form_btn.anonymization')}
                      </Button>
                    </Form>
                </div>
                <div className="row justify-content-center">
                    { this.state.anon_log &&
                        <div className="log col-10" dangerouslySetInnerHTML={ this.state.anon_log } />
                    }
                </div>
            </div>
        );
    }
}

export default withTranslation()(UploadUi)

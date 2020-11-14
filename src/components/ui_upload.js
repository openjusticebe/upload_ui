import React from "react";
import Uploader from "../components/uploader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';

class UploadUi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Copier-coller / Copy-Paste',
            uploaded :  'Copier-coller / Copy-Paste',
            res_text: {__html: '(Zone résultat)' },
            log_text: {__html: '' },
            waiting: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTextExtract = this.handleTextExtract.bind(this);
        this.handleCallback = props.TextHandler;
    }

    logDisplay(loglines) {
        return loglines.join("\n<br />");
    }

    handleTextExtract(text) {
        console.log('extracted text', text);
        this.setState({
            text: text
            //uploaded: text
        });
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
        }

        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_UPLOAD_API}/run`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            }).then(response => response.json())
           .then(resultData => {
                if ('error' in resultData.log)
                    this.handleCallback(false, {log_text: resultData.log.error});
                else if ('lines' in resultData.log)
                    this.handleCallback(resultData.text, {log_text: this.logDisplay(resultData.log.lines)});
                else
                    this.handleCallback(resultData.text);
                this.setState({waiting: false})
            });
    }


    render() {
        return (
            <div className="col-12 shadow rounded border py-3 my-3">
                <h2>1) Charger le contenu / Inhoud uploaden</h2>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <Uploader parentCallback={ this.handleTextExtract } />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <textarea
                        id="content_raw"
                        update={ this.state.uploaded }
                        onChange={ this.handleTextChange }
                        value ={ this.state.text }
                        />
                </div>
                <div className="row justify-content-center mt-3">
                    <Form onSubmit={ this.handleSubmit } className="pl-3">
                      <Button variant="primary" type="submit">
                      {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                      anonymiser / anonimiseren
                      </Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UploadUi

import React from "react";
import Uploader from "../components/uploader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AnonymiseUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            res_text : ''
        };
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(event) {
    }

    static getDerivedStateFromProps(props, state) {
        return {
            res_text : props.uploadedText
        };
    }

    render() {
        return (
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <h2>2) Vérifier anonimisation / Anonimisatie nakijken</h2>
                <div className="log" dangerouslySetInnerHTML={ this.state.log_text} />
                <div className="row justify-content-center">
                    <textarea
                        id="content_raw"
                        // update={ this.state.uploaded }
                         onChange={ this.handleTextChange }
                        value ={ this.state.res_text }
                        />
                </div>
            </div>
        );
    }
}
export default AnonymiseUi


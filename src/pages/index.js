import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Editor from "../components/editor";
// import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/style.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import UploadUi from "../components/ui_upload";
import AnonymiseUi from "../components/ui_anonymise";
import SendUi from "../components/ui_send";


// v1
export const query = graphql`
{
    api {
        algorithms {
            id
            params
            available
            description
            url
        }
    }
}
`

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaded :  'Copier-coller / Copy-Paste',
            res_text:  '(Zone résultat)',
            log_text: {__html: '' },
        };

        this.handleUpload = this.handleUpload.bind(this);
    }

    handleUpload(text, log={}) {
        if (text) {
            console.log('Uploaded text :', text);
            this.setState({
                res_text: text
            })
        }
        if ('log_text' in log) {
            this.setState({
                log_text: {__html: log['log_text'] }
            })
        }
    }


    render() {
        return (
          <Layout>
            <SEO title="OJ / Upload Alpha" />
            <div className="container">
                <div className="row justify-content-center info">
                    <div className="col-5">
                        <h2>Chargement</h2>
                        Interface de chargement de décisions de justice. <br />
                        Avant envoi définitif, aucune donnéé n'est enregistréé ni journalisée. 
                    </div>
                    <div className="col-5">
                        <h2>Upload</h2>
                        Upload interface voor rechtsbeslissingen. <br />
                        Voor het ultieme versturen, wordt er geen data opgeslaan of gelogd.
                    </div>
                </div>
                <div className="row mt-3">
                    <UploadUi TextHandler = { this.handleUpload } />    

                    <AnonymiseUi uploadedText = { this.state.res_text } />
                    
                    <SendUi uploadedText = {this.state.res_text }/>

                </div>
          </div>
          </Layout>
        )
    }
}

export default IndexPage

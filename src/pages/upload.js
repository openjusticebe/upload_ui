import React, {useCallback} from "react";
// import { graphql } from "gatsby";

import Layout from "../components/layout";
import Editor from "../components/editor";
// import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/style.scss";
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

import Dropzone, {useDropzone} from 'react-dropzone'


function MyDropzone() {
  const onDrop = useCallback(acceptedFiles => {
    console.log("I received files !");
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}

class UploadPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Test zone texte'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
        }
    }

    handleTextChange(text) {
        this.setState({
            text: text
        });
    }

    handleFiles(files) {
        var payload = new FormData();
        payload.append('rawFile', files[0]);
        console.log('Payload:', payload);

        fetch(`${process.env.GATSBY_API_URL}/extract`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: payload
        }).then(
            response => response.json()
        ).then( success => {
            console.log('Response received');
            console.log(success);
            this.setState({'text' :  success.markdown });
        }).catch(
            error => console.log(error)
        );
    }

   
    render() {
        return (
            <Layout>
                <SEO title="Text extract upload test" />
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            Page test d'extraction et formatage de texte à partir d'un fichier (PDF, word, ...).
                        </div>
                    </div>
                    <div className="row mt-3">
                        <h2>1) Fichier à traiter</h2>
                    </div>
                    <div className="row mt-3">
                        <Dropzone onDrop={acceptedFiles => this.handleFiles(acceptedFiles)}>
                          {({getRootProps, getInputProps}) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                    </div>
                    <div className="row mt-3">
                        <h2>2) Résultat</h2>
                    </div>
                    <div className="row mt-3">
                        <Editor
                            value={ this.state.text }
                            onChange={ this.handleTextChange }
                            style={{height: "26rem", marginBottom: "5rem", width:"100%"}}
                        />
                    </div>
                    {
                    // <div className="row mt-3">
                    //     <Editor value={ this.state.text } onChange={ this.handleTextChange }/>
                    // </div>
                    }
                </div>
            </Layout>
        );
    }
}

export default UploadPage

import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout";
import Editor from "../components/editor";
// import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/style.scss";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import StepWizard from 'react-step-wizard';

import UploadUi from "../components/ui_upload";
import AnonymiseUi from "../components/ui_anonymise";
import SendUi from "../components/ui_send";
import NavSteps from "../components/nav_steps";

import PlaceholderManager from "../misc/placeholder.js";
import parseText from "../misc/parser.js";

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
            uploaded:  'Copier-coller / Copy-Paste',
            entities : {},
            text_raw:  '(Zone résultat)',
            text_parsed: '',
            entities: {},
            counts: 0,
            log_text: {__html: '' },
        };

        this.handleExtract = this.handleExtract.bind(this);
        this.handleFinalText = this.handleFinalText.bind(this);

        this.addEntity = this.addEntity.bind(this);
        this.remEntity = this.remEntity.bind(this);
        this.updEntity = this.updEntity.bind(this);
    }


    /////////////////////////////////////////////////////////// Text management
    ///////////////////////////////////////////////////////////////////////////



    handleExtract(text, entities_in, log={}) {
        let entities = {...entities_in};
        const keys = Object.keys(entities);
        keys.forEach( key => {
            let e = entities[key];
            entities[key] = {
                id: e.id,
                text: e.text,
                type: e.type,
                words: e.words,
                placeholder: PlaceholderManager.get(e.type, key)
            };
        });
        console.log(entities);
        const parsed = parseText(entities, text)

        if (text) {
            this.setState({
                text_raw: text,
                entities: entities,
                text_parsed : parsed,
                counts: this.state.counts + 1
            })
        }
        if ('log_text' in log) {
            this.setState({
                log_text: {__html: log['log_text'] }
            })
        }
    }


    handleFinalText(event) {
        this.setState({
            text_parsed: event.target.value
        });
    }


    ///////////////////////////////////////////////////////// Entity management
    ///////////////////////////////////////////////////////////////////////////
    addEntity(event) {
        let len = Object.keys(this.state.entities).length + 1;
        let newkey = `entity#${len}`;
        let newEntities = this.state.entities;
        newEntities[newkey] = {
            'text':[],
            'type':'person',
            'placeholder': PlaceholderManager.get('person', newkey)
        };
        this.setState({
            entities : newEntities
        });
    }


    remEntity(event) {
        console.log('remove entity', event.target);
        let newEntities = this.state.entities;
        const id = event.currentTarget.parentNode.parentNode.parentNode.id;
        if (id in newEntities)
            delete newEntities[id]

        this.setState({
            entities : newEntities
        });
    }


    updEntity(event) {
        console.log('update entity', event.target);
        // FIXME: refactor this
        const id = event.currentTarget.parentNode.parentNode.parentNode.id;
        let newEntities = this.state.entities;
        let field = event.target.name;
        if (id in newEntities) {
            console.log('New value for', event.target.name, 'value:', event.target.value);
            if (field == 'text')
                newEntities[id][field] = event.target.value.split('; ');
            else {
                newEntities[id][field] = event.target.value;
            }
        }
        
        const parsed = parseText(newEntities, this.state.text_raw)


        this.setState({
            entities : newEntities,
            text_parsed : parsed
        });

    }


    ///////////////////////////////////////////////////////// Entity management
    ///////////////////////////////////////////////////////////////////////////
    render() {
        return (
          <Layout>
            <SEO title="OJ / Upload Alpha" />
            <div className="container">
                <div className="row">
                        <div className="row justify-content-center info" hashkey={'intro'}>
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
                        <UploadUi 
                            TextHandler = { this.handleExtract }
                            hashKey={'upload'}
                            />    
                        
                        <AnonymiseUi
                                preparedText = { this.state.text_parsed }
                                entities = { this.state.entities }
                                textChange = { this.handleFinalText }
                                entityRemove = { this.remEntity }
                                entityAdd = { this.addEntity }
                                entityChange = { this.updEntity }
                                hashKey={'anonymise'} />
                            
                        <SendUi uploadedText = {this.state.text_parsed } hashKey={'send'} />
                </div>
          </div>
          </Layout>
        )
    }
}


export default IndexPage;

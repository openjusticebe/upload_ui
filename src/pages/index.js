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

import "../fontello/css/fontello2.css"

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
        let newEntities = this.state.entities;
        const id = event.currentTarget.parentNode.parentNode.parentNode.id;
        if (id in newEntities)
            delete newEntities[id]

        const parsed = parseText(newEntities, this.state.text_raw)
        this.setState({
            entities : newEntities,
            text_parsed : parsed
        });
    }


    updEntity(event) {
        // FIXME: refactor this
        const id = event.currentTarget.parentNode.parentNode.parentNode.id;
        let newEntities = this.state.entities;
        let field = event.target.name;
        if (id in newEntities) {
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
                        <div className="row justify-content-center info pb-5" hashkey={'intro'}>
                            <div className="col-6">
                                <h2><i className="icon-thumbs-up" />Partage d'arrêts et jugements</h2>
                                <p>
                                Cet assistant permet le partage et la publication de décisions de justice,
                                dans le cadre du projet pilote mené par l'ASBL <a href="http://openjustice.be">OpenJustice.be</a>.
                                </p>
                                
                                <h2><i className="icon-key" />Inscription</h2>
                                <p>
                                Le dépôt de documents ne peut se faire qu'après inscription et réception
                                d'une clé personnelle, sous réserve d'acceptation par l'ASBL et en fonction
                                de l'avancement de l'expérimentation.
                                <br/><a href="https://airtable.com/shrLQOPwbu7IclErU"><i className="icon-user" />Inscription au projet pilote</a>
                                </p>
                                <h2><i className="icon-database" />Chargement</h2>
                                <i className="icon-wallet" />
                                <a href="https://pad.openjustice.be/s/kwZheAXhI#" target="_blank">Manuel d'utilisation</a><br />
                                Une fois envoyé, vous recevez immédiatement un lien personnel permettant le partage
                                du document.
                                <br/>Après validation par OpenJustice.be, le document sera accessible publiquement.
                                <br/><b>Avant envoi, aucune donnéé n'est enregistréé ni journalisée. </b>
                            </div>
                            <div className="col-6">
                                <h2><i className="icon-thumbs-up" />Delen van oordelen en uitspraken</h2>
                                <p>Deze assistent maakt het mogelijk om gerechtelijke beslissingen te delen en te publiceren, als onderdeel van het pilootproject geleid door de VZW <a href="http://openjustice.be">OpenJustice.be</a>.
                                </p>
                                
                                <h2><i className="icon-key" />Inschrijving</h2>
                                <p>
                                Het uploaden van documenten kan enkel na registratie en ontvangst van een persoonlijke sleutel,
                                onder voorbehoud van acceptatie door de VZW en afhankelijk van de evolutie van het proefproject.
                                <br/><a href="https://airtable.com/shrLQOPwbu7IclErU"><i className="icon-user" />Proefproject inschrijving</a>
                                </p>
                                <h2><i className="icon-database" />Upload</h2>
                                <i className="icon-wallet" />
                                <a href="https://pad.openjustice.be/s/wQQ_aoyUQ#" target="_blank">Gebruikersaanwijzing</a><br />
                                Na verzending ontvang je direct een persoonlijke link om het document te delen.
                                <br/>Na validatie door OpenJustice.be zal het document openbaar toegankelijk zijn.
                                <br/><b>Voor het verzenden worden er geen gegevens geregistreerd of gelogd.</b>
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

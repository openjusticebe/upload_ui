import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PlaceholderManager from "../misc/placeholder.js";

const EntityRow = ({id, words, type, placeholder, onRemove, onChange}) => (
    <Form id={ id }>
        <div className="row">
            <div className="col-4" >
                <Form.Control type="text" name="text" value={ words } onChange={ onChange } />
            </div>
            <div className="col-2">
                <Form.Control as="select" name="type" value={ type } onChange={ onChange }>
                    { PlaceholderManager.types().map( option => (
                        <option key={ option }>{ option }</option>
                    )) }
                </Form.Control>
            </div>
            <div className="col-4">
                <Form.Control type="text" name="placeholder" value={ placeholder } onChange={ onChange }/>
            </div>
            <div className="col-2">
                <Button onClick={ onRemove } className="btn btn-danger">
                    <i className="icon-trash" />
                </Button>
            </div>
        </div>
    </Form>
);


const EntityForm = ({entities, onRemove, onChange}) => (
        <div className="container anonOpts">
            { Object.keys(entities).map( id => {
                return (
                    <EntityRow
                        key={ id }
                        id={ id }
                        words={ entities[id]['text'] }
                        type={ entities[id]['type'] }
                        placeholder={ entities[id]['placeholder'] } 
                        onRemove={ onRemove }
                        onChange={ onChange }
                        />
                );}
            )}
        </div>
);


const AnonymiseUi = (props) => {
    return (
        <div className="col-12 mb-5 shadow rounded border py-3 my-3">
            <h2><i className="icon-eye" /> Vérifier anonimisation / Anonimisatie nakijken</h2>
            <div className="mb-3 mb-3">
                Lien vers la documentation, Link naar de documentatie :<br/>
                <a className="ml-4" rel="noreferrer" href="https://pad.openjustice.be/s/kwZheAXhI#Quelles-sont-les-donn%C3%A9%C3%A9s-%C3%A0-occulter-" target="_blank">Quelles sont les donnéés à occulter ?</a><br/>
                <a className="ml-4" rel="noreferrer" href="https://pad.openjustice.be/s/wQQ_aoyUQ#Welke-gegevens-moeten-worden-verborgen-" target="_blank">Welke gegevens moeten worden verborgen ?</a><br/>
            </div>
            <div className="row justify-content-center">
                <EntityForm
                    entities={ props.entities }
                    onRemove={ props.entityRemove }
                    onChange={ props.entityChange }/>
                <Button onClick={ props.entityAdd } >Ajouter un terme / Term toevoegen</Button>
            </div>
                <hr/>
            <div className="row justify-content-center">
                <p>Aperçu du document final / Voorbeeld van het definitieve document</p>
                <div className="bg-info text-white p-2 m-3">
                    Le texte anonymisé apparaît entre crochets : ceci facilite les traitements ultérieurs.<br />
                    De geanonimiseerde tekst wordt tussen vierkante haken weergegeven: dit vergemakkelijkt de latere verwerking.
                </div>
            </div>
            <div className="row justify-content-center">
                <div id="content_raw">
                    { props.preparedText }
                </div>
            </div>
        </div>
    );
}

export default AnonymiseUi

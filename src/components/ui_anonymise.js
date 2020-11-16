import React from "react";
import Uploader from "../components/uploader";
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
                <Button onClick={ onRemove }>X</Button>
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
                        words={ entities[id]['text'].join('; ') }
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
            <h2>2) Vérifier anonimisation / Anonimisatie nakijken</h2>
            <div className="row justify-content-center">
                <EntityForm
                    entities={ props.entities }
                    onRemove={ props.entityRemove }
                    onChange={ props.entityChange }/>
                <Button onClick={ props.entityAdd } >+</Button>
            </div>
                <hr/>
            <div className="row justify-content-center">
                <p>Aperçu du document final / Voorbeeld van het definitieve document</p>
            </div>
            <div className="row justify-content-center">
                <textarea
                    id="content_raw"
                    // update={ this.state.uploaded }
                    onChange={ props.textChange }
                    value ={ props.preparedText }
                    disabled = "true"
                    />
            </div>
        </div>
    );
}

export default AnonymiseUi

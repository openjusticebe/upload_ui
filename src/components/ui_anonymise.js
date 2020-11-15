import React from "react";
import Uploader from "../components/uploader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const placeholders = {
    'organization' : ['Acme Inc.'],
    'place': ['Aldebaran'],
    'country': ['Gondwana'],
    'person': ['Frodo'],
}

const PlaceholderManager = {
    store: {},
    get: function(type, id) {
        if (id in this.store)
            return this.store[id];
        this.store[id] = placeholders[type];
        return this.store[id];
    }
    
}

const EntityRow = ({id, words, type, placeholder, onRemove, onChange}) => {
    if (placeholder == '') {
        placeholder = PlaceholderManager.get(type, id);
    }

    return (
    <Form id={ id }>
        <div className="row">
            <div className="col-4" >
                <Form.Control type="text" name="text" value={ words } onChange={ onChange } />
            </div>
            <div className="col-2">
                <Form.Control as="select" name="type" value={ type } onChange={ onChange }>
                    { Object.keys(placeholders).map( option => (
                        <option>{ option }</option>
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
)};

const EntityForm = ({entities, onRemove, onChange}) => {
    return (
        <div className="container anonOpts">
            { Object.keys(entities).map( id => {
                return (
                    <EntityRow
                        id={ id }
                        words={ entities[id]['text'].join('; ') }
                        type={ entities[id]['type'] }
                        placeholder={ entities[id]['placeholder'] || PlaceholderManager.get( entities[id]['type'], id)}
                        onRemove={ onRemove }
                        onChange={ onChange }
                        />
                );}
            )}
        </div>
    );

};

class AnonymiseUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            raw_text : '',
            res_text : '',
            entities : {},
            log : false
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.parseText = this.parseText.bind(this);
        this.addEntity = this.addEntity.bind(this);
        this.remEntity = this.remEntity.bind(this);
        this.updEntity = this.updEntity.bind(this);

        this.parsedText = '';
    }

    addEntity(event) {
        let len = Object.keys(this.state.entities).length + 1;
        let newkey = `entity#${len}`;
        let newEntities = this.state.entities;
        newEntities[newkey] = {'text':[], 'type':'person', 'placeholder': ''}
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
            if (field == 'text')
                newEntities[id][event.target.name] = event.target.value.split('; ');
            else
                newEntities[id][event.target.name] = event.target.value;

            console.log(newEntities);
        }
        this.setState({
            entities : newEntities
        });

    }

    handleTextChange(event) {
    }

    parseText(raw) {
        console.log('Render text');
        for (let e_key in this.state.entities) {
            console.log(e);
            let e = this.state.entities[e_key];
            e.text.forEach( w => {
                console.log('cleaning:', w);
                let re = new RegExp(w, "gi");
                raw = raw
                    // .replaceAll(/`qu'(?=${w})`/g, 'que ')
                    // .replaceAll(`d'(?=${w})`, 'de ')
                    .replace(re, `[ ${e.placeholder} ]`);
                });
        }
        return raw;
    }

    static getDerivedStateFromProps(props, state) {
        let entities = props.entities;
        Object.keys(entities).forEach( key => {
            let e = entities[key];
            entities[key]['placeholder'] = PlaceholderManager.get(e.type, key);
        })
        return {
            raw_text: props.uploadedText,
            entities: props.entities,
        };
    }

    render() {
        // this.parseText()
        return (
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <h2>2) Vérifier anonimisation / Anonimisatie nakijken</h2>
                { this.state.log &&
                    <div className="log">
                        { this.state.log }
                    </div>
                }
                <div className="row justify-content-center">
                    <EntityForm entities={ this.state.entities } onRemove={ this.remEntity } onChange={ this.updEntity }/>
                    <button onClick={ this.addEntity } >+</button>
                </div>
                <div className="row justify-content-center">
                    <textarea
                        id="content_raw"
                        // update={ this.state.uploaded }
                        onChange={ this.handleTextChange }
                        value ={ this.parseText(this.state.raw_text) }
                        />
                </div>
            </div>
        );
    }
}
export default AnonymiseUi


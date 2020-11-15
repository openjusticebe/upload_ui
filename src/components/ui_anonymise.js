import React from "react";
import Uploader from "../components/uploader";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const placeholders = {
    'organization' : [
        'Acme Inc.',
        'Camion Int.',
        'Business Pro',
        'Conseil et Fils',
        'Morgen en Zoon',
        'Evel&CO',
        'Fly Air',
        'Zv. Inc.',
    ],
    'place': [
        'Beleriand',
        'Eriador',
        'Rhûn',
        'Harad',
        'Ered Luin',
        'Fangorn',
        'Gondor',
        'Isengard',
        'Mordor',
        'Rohan',
        'Amon Hen',
        'Bruinen',
        'Baranduin',
        'Erebor',
    ],
    'country': [
        'Agamar',
        'Akiva',
        'Alderaan',
        'Ando',
        'Corellia',
        'Crait',
        'Hoth',
        'Sullust',
        'Teht',
        'Zeffo',
        'Yavin',
        'Eriadu',
        'Exegol',
        'Florrum',
        'Fondor',
    ],
    'person': [
        'A. Lydan',
        'B. Syrin',
        'C. Ptorik',
        'D. Joz',
        'E. Varog',
        'F. Gethrod',
        'G. Hezra',
        'H. Feron',
        'I. Ophni',
        'J. Colborn',
        'K. Fintis',
        'L. Gatlin',
        'M. Jinto',
        'N. Hagalbar',
        'O. Krinn',
        'P. Lenox',
        'K. Revvyn',
        'R. Hodus',
        'S. Dimian',
        'T. Paskel',
        'U. Kontas',
        'V. Weston',
        'W. Azamarr',
        'X. Jather',
        'Y. Tekren',
        'Z. Jareth',
        'A. Adon',
        'B. Zaden',
        'C. Eune',
        'D. Graff',
        'E. Tez',
        'F. Jessop',
        'G. Gunnar',
        'H. Pike',
        'I. Domnhar',
        'J. Baske',
        'K. Jerrick',
        'L. Mavrek',
        'M. Riordan',
        'N. Wulfe',
        'O. Straus',
        'P. Tyvrik',
        'K. Henndar',
        'R. Favroe',
        'S. Whit',
        'T. Jaris',
        'U. Renham',
        'V. Kagran',
        'W. Lassrin',
        'X. Vadim',
        'Y. Arlo',
        'Z. Quintis',
        'A. Vale',
        'B. Caelan',
        'C. Yorjan',
        'D. Khron',
        'E. Ishmael',
        'F. Jakrin',
        'G. Fangar',
        'H. Roux',
        'I. Baxar',
        'J. Hawke',
        'K. Gatlen',
        'L. Barak',
        'M. Nazim',
        'N. Kadric',
        'O. Paquin',
        'P. Kent',
        'K. Moki',
        'R. Rankar',
        'S. Lothe',
        'T. Ryven',
        'U. Clawsen',
        'V. Pakker',
        'W. Embre',
        'X. Cassian',
        'Y. Verssek',
        'Z. Dagfinn',
        'O. Ebraheim',
        'P. Nesso',
        'K. Eldermar',
        'R. Rivik',
        'S. Rourke',
        'T. Barton',
        'U. Hemm',
        'V. Sarkin',
        'W. Blaiz',
        'X. Talon',
        'Y. Agro',
        'Z. Zagaroth',
        'A. Turrek',
        'B. Esdel',
        'C. Lustros',
        'D. Zenner',
        'E. Baashar',
        'F. Dagrod',
        'G. Gentar',
        'H. Feston',
    ]
}

const PlaceholderManager = {
    store: {},
    get: function(type, id) {
        if (id in this.store)
            return this.store[id];
        let len = placeholders[type].length
        this.store[id] = placeholders[type][Math.floor(Math.random() * len)];
        return this.store[id];
    }
    
}

const EntityRow = ({id, words, type, placeholder, onRemove, onChange}) => {
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
                        placeholder={ entities[id]['placeholder'] } 
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
        let entities = Object.assign({}, props.entities);
        Object.keys(entities).forEach( key => {
            let e = entities[key];
            entities[key]['placeholder'] = PlaceholderManager.get(e.type, key);
        })
        this.state = {
            raw_text : props.uploadedText,
            res_text : '',
            entities : entities,
            log : false
        };
        this.callback = props.FinalHandler;
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
        newEntities[newkey] = {'text':[], 'type':'person', 'placeholder': PlaceholderManager.get('person', newkey)}
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
        this.setState({
            entities : newEntities
        });

    }

    handleTextChange(event) {
        this.setState({
            res_text : event.target.value
        });
        // this.callback(event.target.value);
    }

    parseText(raw) {
        console.log('Render text');
        for (let e_key in this.state.entities) {
            let e = this.state.entities[e_key];
            e.text.forEach( w => {
                let re = new RegExp(w, "gi");
                raw = raw
                    // .replaceAll(/`qu'(?=${w})`/g, 'que ')
                    // .replaceAll(`d'(?=${w})`, 'de ')
                    .replace(re, `${e.placeholder}`);
                });
        }
        return raw;
    }

    render() {
        // this.parseText()
        Object.keys(this.state.entities).forEach( key => {
            let e = this.state.entities[key];
            if ( ! 'placeholder'  in e)
                this.state.entities[key]['placeholder'] = PlaceholderManager(e.type, key);
        })
        const out_text = this.parseText(this.state.raw_text);
        this.callback(out_text);
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
                        value ={ out_text }
                        />
                </div>
            </div>
        );
    }
}
export default AnonymiseUi


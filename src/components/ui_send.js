import React from "react";
import { navigate } from "gatsby"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';
import {YEARS, COURTS, CATEGORIES} from '../misc/data';

class SendUi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country : 'BE',
            court: 'RSCE',
            year: 1990,
            identifier: '',
            text: '',
            lang: 'NL',
            userkey: '',
            category: 'other',
            waiting: false,
            error:false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        return {
            text : props.uploadedText
        };
    }

    handleChange(event) {
        let change = {}
        const name = event.target.name;
        change[name] = name == 'identifier' ? event.target.value + '.OJ' : event.target.value

        this.setState(change);
    }

    handleSubmit(event) {
        this.setState({ waiting: true });
        event.preventDefault();


        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
            'country' : this.state.country,
            'court' : this.state.court,
            'year' : this.state.year,
            'identifier' : this.state.identifier,
            'text' : this.state.text,
            'lang' : this.state.lang,
            'category' : this.state.category,
            'user_key' : this.state.userkey,
        }
        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_DATA_API}/create`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            }).then(response => response.json())
           .then(resultData => {
                // FIXME: Add some log
                //if ('error' in resultData.log)
                //    this.handleCallback(false, {log_text: resultData.log.error});
                //else if ('lines' in resultData.log)
                    // this.handleCallback(resultData.text, {log_text: this.logDisplay(resultData.log.lines)});
                this.setState({waiting: false})
                if (resultData.result == 'ok')
                    navigate(`/success?hash=${resultData.hash}`)
            }).catch(error => {
                const msg = `Erreur de serveur, Server fout: ${error.toString()}`;
                this.setState({waiting: false, error:{__html: msg}});
            });
    }

    render() {
        return (
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <h2>3) Définir données et envoyer / Gegevens invullen en versturen</h2>
                <div className="row">
                    <Form onSubmit={ this.handleSubmit } onChange={ this.handleChange } className="pl-3">
                      <Form.Group controlId="myform.country">
                          <Form.Label>Pays / Land</Form.Label>
                          <Form.Control name="country" as="select">
                            <option>BE</option>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.court">
                          <Form.Label>Source / Bron</Form.Label>
                          <Form.Control name="court" as="select">
                            { COURTS.map( (court) => (
                                <option value={ court.id }>{ court.id } / {court.name_fr} - {court.name_nl}</option>
                            ))}
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.category">
                          <Form.Label>Catégorie / Categorie</Form.Label>
                          <Form.Control name="category" as="select">
                            { CATEGORIES.map( (cat) => (
                                <option value={ cat.id }>{cat.name_fr} - {cat.name_nl}</option>
                            ))}
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.lang">
                          <Form.Label>Langue / Taal</Form.Label>
                          <Form.Control name="lang" as="select">
                            <option value="NL">NL</option>
                            <option value="FR">FR</option>
                            <option value="DE">DE</option>
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.year">
                          <Form.Label>Année / Jaar</Form.Label>
                          <Form.Control name="year" as="select">
                            { YEARS.map( year => (<option>{ year }</option>) ) }
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.identifier">
                        <Form.Label>Identifiant / Identifier</Form.Label>
                        <Form.Control type="text" name="identifier" placeholder="ARR.XXXXXX" />
                      </Form.Group>

                      <Form.Group controlId="myform.userkey">
                        <Form.Label>Clé Utilisateur / Gebruiker sleutel</Form.Label>
                        <Form.Control type="text" name="userkey" placeholder="XXXXX" />
                      </Form.Group>

                      <pre>
                        ECLI:{this.state.country}:{this.state.court}:{this.state.year}:{this.state.identifier}
                      </pre>

                      { this.state.error &&
                          <div className="log col-10" dangerouslySetInnerHTML={ this.state.error } />
                      }
                      <Button variant="primary" type="submit">
                      {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                      envoyer / doorsturen
                      </Button>
                    </Form>
                </div>
            </div>
        );
    }
}
export default SendUi


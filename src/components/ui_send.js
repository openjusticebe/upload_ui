import React from "react";
import { navigate } from "gatsby"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';
import {YEARS, COURTS} from '../misc/data';

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
            waiting: false,
            error:false,
            labels:[],
            labelSuggestions: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.labelsKeyDown = this.labelsKeyDown.bind(this);
        this.labelRemove = this.labelRemove.bind(this);
        this.labelSelect = this.labelSelect.bind(this);
        this.labelInput = '';
        this.labelController = false;
    }

    static getDerivedStateFromProps(props, state) {
        return {
            text : props.uploadedText
        };
    }

    componentDidMount() {
        this.labelController = new AbortController();
    }

    handleChange(event) {
        let change = {}
        const name = event.target.name;
        change[name] = name === 'identifier' ? event.target.value + '.OJ' : event.target.value

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
            'labels' : this.state.labels,
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
                if (resultData.result === 'ok')
                    navigate(`/success?hash=${resultData.hash}`)
                else if (resultData.detail)
                    this.setState({error:{__html: resultData.detail}});
                else
                    this.setState({error:{__html: resultData}});
            }).catch(error => {
                const msg = `Erreur de serveur, Server fout: ${error.toString()}`;
                this.setState({waiting: false, error:{__html: msg}});
            });
    }

    labelsKeyDown(event) {
        // Abort running query, if any

        if (this.labelController != false)
            this.labelController.abort();
        this.labelController = new AbortController();
        const val = event.target.value;
        console.log(event.key);
        if ((event.key === 'Enter' || event.key === ' ') && val) {
          event.preventDefault();
          if (this.state.labels.find(label => label.toLowerCase() === val.toLowerCase())) {
            return;
          }
          const newlabels = [ ...this.state.labels, val]
          this.setState({ labels:  newlabels });
          this.labelInput.value = null;
        } else if (event.key === 'Backspace' && !val) {
          this.labelRemove(this.state.labels.length - 1);
        }

        const { signal } = this.labelController;
        const str = val + event.key;

        //FIXME: Suboptimal, check websockets or another protocol
        fetch(`${process.env.GATSBY_DATA_API}/labels/${str}`, {
            method: 'get',
            signal: signal,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }})
            .then(response => response.json())
            .then(labelList => {
                if (Array.isArray(labelList)) {
                    this.setState({ labelSuggestions : labelList });
                } else {
                    console.log('Failed recovering suggestions : ', labelList);
                }
            })
            .catch(error => console.log(error) );
    }

    labelRemove(index) {
        const newlabels = [ ...this.state.labels ];
        newlabels.splice(index, 1);

        // Call the defined function setlabels which will replace labels with the new value.
        this.setState({ labels: newlabels });
    }

    labelSelect(event) {
        const val = event.target.innerText;

        if (this.state.labels.find(label => label.toLowerCase() === val.toLowerCase())) {
            this.setState({ labelSuggestions: [] });
        } else {
            const newlabels = [ ...this.state.labels, val]
            this.setState({ labels:  newlabels, labelSuggestions: [] });
        }

        this.labelInput.value = null;
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
                            { COURTS.map( (group, i) => (
                                <optgroup key={ i } label={ group.label_fr + " / " + group.label_nl }>
                                    { group.list.map((court, j) =>
                                        <option key={ j } value={ court.id }>{ court.id } / {court.name_fr} - {court.name_nl}</option>)
                                    }
                                </optgroup>
                            ))}
                          </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="myform.labels">
                          <Form.Label>labels (catégories / categorieën)</Form.Label>
                          <div className="text-muted">COVID-19, anatocisme, ...</div>
                          <ul className="labels-list">
                            { this.state.labels.map((label, i) => (
                                <li key={i} className="bg-dark text-white">
                                    #{label}
                                    <button type="button" onClick={ () => { this.labelRemove(i);} }>+</button>
                                </li>
                            ))}
                            <li className="labels-input">
                                <input type="text" onKeyDown={ this.labelsKeyDown } ref={c => { this.labelInput = c; }} />
                                { this.state.labelSuggestions.length > 0 &&
                                <ul className="sublabels">
                                    { this.state.labelSuggestions.map((label, i) => (
                                        <li key={i} className="bg-light" onClick={ this.labelSelect }>
                                            {label}
                                        </li>
                                    ))}
                                </ul>
                                }
                            </li>
                          </ul>
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
                            { YEARS.map( year => (<option key={ year }>{ year }</option>) ) }
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

                      { !this.state.error &&
                      <p>La dernière étape / de laatste stap : </p>
                      }

                      { this.state.error &&
                          <div className="log col-10" dangerouslySetInnerHTML={ this.state.error } />
                      }
                      <div className="row justify-content-center mt-4">
                      <div>
                          <Button variant="warning" type="submit" className="p-3">
                          {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                          envoyer / doorsturen
                          </Button>
                      </div>
                      </div>
                    </Form>
                </div>
            </div>
        );
    }
}
export default SendUi


import React from "react";
import { navigate } from "gatsby"
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoadGif from '../images/hourglass.gif';
import {YEARS, COURTS} from '../misc/data';

// Link : https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f
const DocLinks = ( { docs } ) => {
    return docs.map((doc, idx) => {
        const typeId = `typ-${idx}`, identifierId = `id-${idx}`, labelId =`lab-${idx}`;
        const typeCtrl = `myform.doctype_{idx}`, identifierCtrl = `myform.docidentifier_${idx}`, labelCtrl =`myform.doclabel_${idx}`;

        return (
        <li key={ idx }>
            <Row>
                <Col className="col-4">
                    <Form.Group controlId={ typeCtrl }>
                        <Form.Label>Type :</Form.Label>
                        <Form.Control name={ typeId } id={ typeId } data-id={ idx } as="select">
                            <option value="eli">ELI (legislation)</option>
                            <option value="ecli">ECLI (jurisprudence)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={ identifierCtrl }>
                        <Form.Label>Lien / Identifiant :</Form.Label>
                        <Form.Control type="text" name={ identifierId } id={ identifierId } data-id={ idx } />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="mt-3">
                    <Form.Group controlId={ labelCtrl }>
                        <Form.Label>Label / Description :</Form.Label>
                        <Form.Control type="text" name={ labelId } id={ labelId } data-id={ idx } />
                    </Form.Group>
                </Col>
            </Row>
        </li>
        );
    });
};

//      type    identifier                                                                  label
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/arrete/2020/03/23/2020030347/justel"	"23 Mars 2020. - Arrêté ministériel portant des mesures d'urgence pour limiter la propagation du coronavirus COVID-19"
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/constitution/1994/02/17/1994021048/justel"	"17 février 1994. La constitution coordonnée"
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/loi/2007/05/15/2007000663/justel"	"15 MAI 2007. - Loi relative à la sécurité civile."
// 12	"ecli"	"BE/RSCE/2020/ARR.248819"	"C.E., 30 octobre 2020, n°248.819"
// 12	"ecli"	"BE/GHCC/2018/2018.153f"	"C. const., 8 novembre 2018, n°153/18"

class SendUi extends React.Component {

    constructor(props) {
        super(props);
        this.docBlank = {type:'', idt:'', label:''};
        this.state = {
            country : 'BE',
            court: 'RSCE',
            year: 2020,
            identifier: '',
            text: '',
            lang: 'NL',
            appeal: '',
            userkey: '',
            waiting: false,
            error:false,
            labels:[],
            labelSuggestions: [],
            docLinks: [{...this.docBlank}],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.labelsKeyDown = this.labelsKeyDown.bind(this);
        this.labelRemove = this.labelRemove.bind(this);
        this.labelSelect = this.labelSelect.bind(this);
        this.docAdd = this.docAdd.bind(this);
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
            'appeal' : this.state.appeal, 
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

    docAdd() {
        this.setState({ docLinks: [...this.state.docLinks, {...this.docBlank}]});
    }

    render() {
        return (
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <h2>3) Définir données et envoyer / Gegevens invullen en versturen</h2>
                <div className="row px-4 mt-4">
                    <Form onSubmit={ this.handleSubmit } onChange={ this.handleChange } className="pl-3">
                        <fieldset className="border border-secondary p-3">
                            <legend className="text-muted">Propriétés du document / document eigenschappen</legend>
                            <Row>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.country">
                                        <Form.Label>Pays / Land</Form.Label>
                                        <Form.Control name="country" as="select">
                                          <option>BE</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.lang">
                                        <Form.Label>Langue / Taal</Form.Label>
                                        <Form.Control name="lang" as="select">
                                          <option value="NL">NL</option>
                                          <option value="FR">FR</option>
                                          <option value="DE">DE</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col className="px-4">
                                    <Form.Group controlId="myform.year">
                                        <Form.Label>Année / Jaar</Form.Label>
                                        <Form.Control name="year" as="select">
                                          { YEARS.map( year => (<option key={ year }>{ year }</option>) ) }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>

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

                            <Form.Group controlId="myform.appeal">
                                <Form.Label>Appel interjeté / Hoger beroep</Form.Label> 
                                <Form.Control name="appeal" as="select">
                                  <option value="nodata" default="yes">Pas d'information / Geen informatie</option>
                                  <option value="yes">Oui / Ja</option>
                                  <option value="no">Non / Nee</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="myform.labels">
                                <Form.Label>Labels / Etiketten (catégories / categorieën)</Form.Label>
                                <div className="text-muted mb-1">COVID-19, anatocisme, ...</div>
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
                        </fieldset>

                        <fieldset className="border border-secondary p-3 mt-4 mb-4">
                            <legend className="text-muted">Liens et références vers d'autres textes</legend>
                            <Form.Group controlId="myform.docs">
                                <Form.Label></Form.Label>
                                <ul className="docs-list">
                                    <DocLinks docs={ this.state.docLinks } />
                                </ul>
                                <button type="button" onClick={ () => this.docAdd() }>+</button>
                            </Form.Group>
                        </fieldset>

                        <fieldset className="border border-secondary p-3 mt-4 mb-4">
                            <legend className="text-muted">Données de téléchargement / Upload gegevens</legend>
                            <Form.Group controlId="myform.identifier">
                              <Form.Label>Identifiant du document / Document Identificatie nummer</Form.Label>
                              <div className="text-muted mb-1">
                                  ARR.20200912 , ... <br />
                                  (sera révisé lors de la validation / zal worden herzien tijdens validatie)
                              </div>
                              <Form.Control type="text" name="identifier" placeholder="ARR.XXXXXX" />
                            </Form.Group>

                            <Form.Group controlId="myform.userkey">
                              <Form.Label>Clé Utilisateur / Gebruiker sleutel</Form.Label>
                              <Form.Control type="text" name="userkey" placeholder="XXXXX" />
                            </Form.Group>

                            <pre>
                              ECLI:{this.state.country}:{this.state.court}:{this.state.year}:{this.state.identifier}
                            </pre>

                        </fieldset>
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


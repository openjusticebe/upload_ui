import React, {useState, useEffect } from "react"
import { navigate } from "gatsby";
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocLinks from "../doclink";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col} from 'react-bootstrap';
import {YEARS, COURTS, STATUS} from '../../misc/data';
import LoadGif from '../../images/hourglass.gif';
import { useQueryParam, BoolParam } from "use-query-params";

import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';


const DefaultState = {
    'text': '',
    'lang': null,
    'year': 0,
    'court': '',
    'appeal': 'nodata',
}

const Edit = ({docid}) => {
    const [docData, setDocData] = useState({ ...DefaultState });
    const [docLinks, setDocLinks] = useState([]);
    const [docLabels, setDocLabels] = useState([]);
    const [errors, setErrors] = useState(false);
    const [validated, setValidated] = useState(false);
    const [labelSuggestions, setLabelSuggestions] = useState([]);
    const docLinkBlank = {kind:'eli', link:'', label:''};
    const [saved, setSaved] = useQueryParam("saved", BoolParam);
    var labelInput = '';
    var labelController = false;

    const componentDidMount = () => {
        this.labelController = new AbortController();
    }

    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/d/read/${docid}`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json()) // parse JSON from request
            .then(rd => {
                setDocLinks(rd.links);
                setDocLabels(rd.labels);
                setDocData({
                    'id': rd.id,
                    'country': rd.country,
                    'lang': rd.lang,
                    'court': rd.court,
                    'year': rd.year,
                    'appeal': rd.appeal,
                    'ecli': rd.ecli,
                    'identifier': rd.identifier,
                    'text': rd.text,
                    'hash': rd.hash,
                    'status': rd.status,
                });
            }) // set data for the number of stars
    }, []);

    useEffect(() => {
        if (saved === 'true') {
            NotificationManager.success('Modifications sauvegardées', 'Info');
        }
        setSaved('false');
    }, [saved]);

    const docDel = (index) => {
        const newDocs = [ ...docLinks ];
        newDocs.splice(index, 1);
        setDocLinks(newDocs);
    };

    const docAdd = () => {
        setDocLinks([...docLinks, {...docLinkBlank}]);
    };

    const labelRemove = (index) => {
        const newLabs = [...docLabels];
        newLabs.splice(index, 1);
        setDocLabels(newLabs);
    };

    const labelSelect = (event) => {
        const val = event.target.innerText;

        if (docLabels.find(label => label.toLowerCase() === val.toLowerCase())) {
            setLabelSuggestions([]);
        } else {
            setDocLabels([...docLabels, val]);
            setLabelSuggestions([]);
        }
        labelInput.value = null;
    };

    const labelsKeyDown = (event) => {
        // Abort running query, if any

        if (labelController !== false)
            labelController.abort();
        labelController = new AbortController();
        const val = event.target.value;
        if ((event.key === 'Enter' || event.key === ' ') && val) {
          event.preventDefault();
          if (docLabels.find(label => label.toLowerCase() === val.toLowerCase())) {
            return;
          }
          setDocLabels([...docLabels, val]);
          labelInput.value = null;
        } else if (event.key === 'Backspace' && !val) {
          labelRemove(docLabels.length - 1);
        }

        const { signal } = labelController;
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
                    setLabelSuggestions(labelList);
                } else {
                    console.log('Failed recovering suggestions : ', labelList);
                }
            })
            .catch(error => console.log(error) );
    };

    const formChange = (event) => {
        let change = {}
        const name = event.target.name;
        const cname = event.target.className.split(' ')[0]; 
        if ( ['kind', 'link', 'label'].includes(cname) ) {
            const newLinks = [...docLinks];
            newLinks[event.target.dataset.id][cname] = event.target.value;
            setDocLinks(newLinks);
        } else {
            const newDoc = {...docData};
            newDoc[name] = event.target.value;
            setDocData(newDoc);
        }
    };

    const formSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            return;
        }

        setValidated(true);
        event.preventDefault();

        const query = {
            '_v' : 1,
            '_timestamp': Math.floor(Date.now() / 1000),
            'country' : docData.country,
            'court' : docData.court,
            'ecli' : docData.ecli,
            'year' : docData.year,
            'identifier' : docData.identifier,
            'text' : docData.text,
            'lang' : docData.lang,
            'labels' : docLabels,
            'appeal' : docData.appeal, 
            'status': docData.status,
            'doc_links' : docLinks,
        }

        // Get api response
        // fetch(`https://anon-api.openjustice.be/run`, {
        fetch(`${process.env.GATSBY_DATA_API}/d/update/${docData.id}`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(query),
            }).then(response => response.json())
           .then(resultData => {
                if (resultData.result === 'ok')
                    navigate(`/admin/edit/${docData.id}?saved=true`)
                else if (resultData.detail) {
                    setErrors({__html: JSON.stringify(resultData.detail)});
                    NotificationManager.error('Erreur de sauvegarde', 'Info');
                } else {
                    setErrors({__html: resultData});
                    NotificationManager.error('Erreur de sauvegarde', 'Info');
                }
            }).catch(error => {
                const msg = `Erreur de serveur, Server fout: ${error.toString()}`;
                setErrors({__html: msg});
            });
    }

    return (
        <div id="edit" style={{maxWidth:"1500px", marginLeft:"auto", marginRight:"auto"}}>
            <Form className="container-fluid" validated={ validated } onChange= { formChange } onSubmit={ formSubmit}>
            <div className="row">
                <div className="col-12 col-lg-7 mb-5 shadow rounded border my-3 p-3">
                    <Form.Group controlId="myform.text">
                    <h2><i className="icon-eye" />Edition document <b>{ docid }</b></h2>
                    <div className="row justify-content-center p-3">
                        <Form.Control
                            id="main"
                            name="text"
                            as="textarea"
                            rows={40}
                            value ={ docData['text'] }
                            />
                    </div>
                    </Form.Group>
                </div>
                <div className="col-12 col-lg-5 mb-5 shadow rounded border my-3">
                    <fieldset className="border border-secondary p-3 mt-4 mb-4">
                    <legend className="text-muted">
                        <i className="icon-pencil pr-2" />
                        Propriétés du document / document eigenschappen
                    </legend>
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
                                <Form.Control name="lang" as="select" value={ docData['lang']}>
                                  <option value="null">Non défini</option>
                                  <option value="NL">NL</option>
                                  <option value="FR">FR</option>
                                  <option value="DE">DE</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col className="px-4">
                            <Form.Group controlId="myform.year">
                                <Form.Label>Année / Jaar</Form.Label>
                                <Form.Control name="year" as="select" value={ '' + docData['year'] }>
                                  { YEARS.map( year => (<option key={ year } value={ year }>{ year }</option>) ) }
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="myform.court">
                        <Form.Label>Source / Bron</Form.Label>
                        <Form.Control name="court" as="select" value={ docData['court']} >
                          { COURTS.map( (group, i) => (
                              <optgroup key={ i } label={ group.label_fr + " / " + group.label_nl }>
                                  { group.list.map((court, j) =>
                                      <option key={ j } value={ court.id }>{ court.id } / {court.name_fr} - {court.name_nl}</option>)
                                  }
                              </optgroup>
                          ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="myform.identifier">
                      <Form.Label>Identifiant du document / Document Identificatie nummer</Form.Label>
                      <div className="text-muted mb-1">
                          ARR.20200912 , ... <br />
                          (sera révisé lors de la validation / zal worden herzien tijdens validatie)
                      </div>
                      <Form.Control type="text" name="identifier" placeholder="ARR.XXXXXX"  value={ docData.identifier }/>
                    </Form.Group>

                    <Form.Label>Aperçu ECLI / ECLI voorbeeld</Form.Label>
                    <pre>
                      ECLI:{docData.country}:{docData.court}:{docData.year}:{docData.identifier}
                    </pre>
                    </fieldset>
                    <fieldset className="border border-secondary p-3 mt-4 mb-4">
                        <legend className="text-muted">
                            <i className="icon-comment pr-2" />
                            Autres méta-données
                        </legend>
                    <Form.Group controlId="myform.appeal">
                        <Form.Label>Appel interjeté / Hoger beroep</Form.Label> 
                        <Form.Control name="appeal" as="select" value={ docData['appeal']} >
                          <option value="nodata" default="yes">Pas d'information / Geen informatie</option>
                          <option value="yes">Oui / Ja</option>
                          <option value="no">Non / Nee</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="myform.labels">
                        <Form.Label>Labels / Etiketten (catégories / categorieën)</Form.Label>
                        <div className="text-muted mb-1">COVID-19, anatocisme, ...</div>
                        <ul className="labels-list">
                          { docLabels.map((label, i) => (
                              <li key={i} className="bg-dark text-white">
                                  #{label}
                                  <button type="button" onClick={ () => { labelRemove(i);} }>+</button>
                              </li>
                          ))}
                          <li className="labels-input">
                              <input type="text" onKeyDown={ labelsKeyDown } ref={c => { labelInput = c; }} />
                              { labelSuggestions.length > 0 &&
                              <ul className="sublabels">
                                  { labelSuggestions.map((label, i) => (
                                      <li key={i} className="bg-light" onClick={ labelSelect }>
                                          {label}
                                      </li>
                                  ))}
                              </ul>
                              }
                          </li>
                        </ul>
                    </Form.Group>
                    </fieldset>
                    <a href={ `${process.env.GATSBY_DATA_API}/hash/${docData.hash}` } className="btn btn-secondary" target="_blank">
                        Visualiser le document dans sont état actuel
                    </a>
                </div>
            </div>
            <div className="col-12 mb-5 shadow rounded border my-3">
                <fieldset className="border border-secondary p-3 mt-4 mb-4">
                    <legend className="text-muted">
                        <i className="icon-attach pr-2" />
                        Liens et références vers d'autres textes
                    </legend>
                    <Form.Group controlId="myform.docs">
                        <Form.Label></Form.Label>
                        <ul className="doclinks list-group">
                            <DocLinks
                                docs={ docLinks }
                                docDel={ docDel }
                            />
                        </ul>
                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                onClick={ () => docAdd() }
                                className="btn btn-primary" >
                                Ajouter / Toevoegen
                            </button>
                        </div>
                    </Form.Group>
                </fieldset>
            </div>
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <fieldset className="border border-secondary p-3 mt-4 mb-4">
                    <legend className="text-muted">
                        <i className="icon-database pr-2" />
                        État et enregistrement
                    </legend>
                    <Form.Group controlId="myform.status">
                        <Form.Label>État / Status</Form.Label> 
                        <Form.Control name="status" as="select" value={ docData['status']} >
                          { STATUS.map( stat => (<option key={ stat.id } value={ stat.id }>{ stat.name_fr }</option>) ) }
                        </Form.Control>
                    </Form.Group>
                    { (docData['status'] == 'new') && <div className="bg-secondary text-white col-12 p-3">Nouveau : le document reste dans la collection des documents à traiter</div> }
                    { (docData['status'] == 'public') && <div className="bg-success text-white col-12 p-3">Publié : Le document sera publiquement accessible et indexé</div> }
                    { (docData['status'] == 'flagged') && <div className="bg-primary text-white col-12 p-3">Signalé : Le document ne sera plus publié, et repris dans la collection des documents signalés</div> }
                    { (docData['status'] == 'hidden') && <div className="bg-dark text-white col-12 p-3">Caché : Le document ne sera plus publié, et repris dans la collection des documents cachés</div> }
                    { (docData['status'] == 'deleted') && <div className="bg-danger text-white col-12 p-3">Retiré : Le document sera retiré et mis dans la corbeille, en attendant sa suppression</div> }
                    { errors && <div className="log col-12 p-3" dangerouslySetInnerHTML={ errors } /> }
                    <div className="row justify-content-center mt-4">
                        <div>
                            <Button variant="warning" type="submit" className="p-3">
                            <i className="icon-paper-plane pr-2" />
                                enregistrer
                            </Button>
                        </div>
                    </div>
                </fieldset>
            </div>
            </Form>
        </div>
    );
}

export default Edit;

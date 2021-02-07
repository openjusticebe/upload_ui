import React, {useState, useEffect } from "react"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import {YEARS, COURTS} from '../../misc/data';

const DefaultState = {
    'text': '',
    'lang': null,
    'year': 0,
    'court': '',
    'appeal': 'nodata',
    'labels': [],

}

const Edit = ({docid}) => {
    const [docData, setDocData] = useState({ ...DefaultState });
    useEffect(() => {
        fetch(`http://localhost:5005/d/read/${docid}`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                console.log(resultData);
                setDocData(resultData);
            }) // set data for the number of stars
    }, []);

    return (
        <div className="container m-3">
            Edition document <b>{ docid }</b>
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
                <Form className="pl-3">
                <h2><i className="icon-eye" /> Texte transmis </h2>
                <div className="row justify-content-center">
                    <textarea
                        id="content_raw"
                        value ={ docData['text'] }
                        disabled = { true } 
                        />
                </div>
                </Form>
            </div>
            <div className="col-12 mb-5 shadow rounded border py-3 my-3">
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

                <Form.Group controlId="myform.appeal">
                    <Form.Label>Appel interjeté / Hoger beroep</Form.Label> 
                    <Form.Control name="appeal" as="select" value={ docData['appeal']} >
                      <option value="nodata" default="yes">Pas d'information / Geen informatie</option>
                      <option value="yes">Oui / Ja</option>
                      <option value="no">Non / Nee</option>
                    </Form.Control>
                </Form.Group>

                {/*
                <Form.Group controlId="myform.labels">
                    <Form.Label>Labels / Etiketten (catégories / categorieën)</Form.Label>
                    <div className="text-muted mb-1">COVID-19, anatocisme, ...</div>
                    <ul className="labels-list">
                      { docData['labels'].map((label, i) => (
                          <li key={i} className="bg-dark text-white">
                              #{label}
                              <button type="button" onClick={ 'ok' }>+</button>
                          </li>
                      ))}
                      <li className="labels-input">
                          <input type="text" onKeyDown={ 'ok' } ref={c => { 'ok' }} />
                      </li>
                    </ul>
                </Form.Group>
                */}

                {/*
                Further fields to edit:
                - status
                - ecli (identifier)

                - labels
                - doclinks
                */}
            </div>


        </div>
    );
}

export default Edit;

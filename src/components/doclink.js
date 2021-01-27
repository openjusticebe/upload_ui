import React from "react";
import { Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
// Link : https://itnext.io/building-a-dynamic-controlled-form-in-react-together-794a44ee552c
// https://itnext.io/how-to-build-a-dynamic-controlled-form-with-react-hooks-2019-b39840f75c4f

//      type    identifier                                                                  label
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/arrete/2020/03/23/2020030347/justel"	"23 Mars 2020. - Arrêté ministériel portant des mesures d'urgence pour limiter la propagation du coronavirus COVID-19"
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/constitution/1994/02/17/1994021048/justel"	"17 février 1994. La constitution coordonnée"
// 12	"eli"	"http://www.ejustice.just.fgov.be/eli/loi/2007/05/15/2007000663/justel"	"15 MAI 2007. - Loi relative à la sécurité civile."
// 12	"ecli"	"BE/RSCE/2020/ARR.248819"	"C.E., 30 octobre 2020, n°248.819"
// 12	"ecli"	"BE/GHCC/2018/2018.153f"	"C. const., 8 novembre 2018, n°153/18"
const DocLinks = ( { docs, docDel } ) => {
    return docs.map((doc, idx) => {
        const typeId = `typ-${idx}`, identifierId = `id-${idx}`, labelId =`lab-${idx}`;
        const typeCtrl = `myform.doctype_{idx}`, identifierCtrl = `myform.docidentifier_${idx}`, labelCtrl =`myform.doclabel_${idx}`;

        return (
        <li key={ idx } className="doclink list-group-item">
            <Row>
                <Col className="col-4">
                    <Form.Group controlId={ typeCtrl }>
                        <Form.Label>Type :</Form.Label>
                        <Form.Control name={ typeId } data-id={ idx } as="select" className="kind">
                            <option value="eli" default>ELI (legislation)</option>
                            <option value="ecli">ECLI (jurisprudence)</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId={ identifierCtrl }>
                        <Form.Label>Lien / Identifiant :</Form.Label>
                        <Form.Control
                            type="text"
                            name={ identifierId }
                            data-id={ idx }
                            className="link"
                            placeholder="ECLI:2012:(...)"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="col-10">
                    <Form.Group controlId={ labelCtrl }>
                        <Form.Label>Label / Description :</Form.Label>
                        <Form.Control
                            type="text"
                            name={ labelId }
                            data-id={ idx }
                            className="label"
                            placeholder="Décision du 31 février (...)"
                        />
                    </Form.Group>
                </Col>
                <Col className="col-2 d-flex">
                    <button type="button" className="btn btn-outline-danger align-self-end ml-auto" onClick={ () => docDel( idx ) }>
                        <i className="icon-trash" />
                    </button>
                </Col>
            </Row>
        </li>
        );
    });
};

export default DocLinks;

import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoadGif from '../../images/hourglass.gif';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { handleLogin, isLoggedIn } from "../../services/auth"

const EmptyForm = {
    'username': null,
    'password': null,
}

const LoginForm = ({ lostPasswordClick }) => {

    const [formData, setFormData] = useState(EmptyForm);
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleUpdate = event => {
        let fdata = formData;
        fdata[event.target.name] = event.target.value;
        setError(false);
        setFormData(fdata);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        setWaiting(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setWaiting(false);
            return;
        }
        handleLogin(
            formData,
            () => {navigate(`/`)},
            () => {handleError()}
        );
    };

    const handleError = () => {
        setError(true);
        setWaiting(false);
    };

    if (isLoggedIn()) {
        navigate(`/`);
    };

    return (
        <div className="container m-3 d-flex justify-content-center">
            <div className="col-6 mt-5">
                <h2 className="display-5 text-secondary mb-4">Connexion utilisateur</h2>
                <Form
                  noValidate
                  validated={ validated }
                  method="post"
                  onSubmit={event => {
                    handleSubmit(event)
                  }}
                >
                    <Row>
                        <Form.Label>
                            Email
                          <Form.Control name="username" required type="text" onChange={ handleUpdate } />
                        </Form.Label>
                    </Row>
                    <Row>
                        <Form.Label>
                          Mot de passe
                          <Form.Control name="password" required type="password" onChange={ handleUpdate } />
                        </Form.Label>
                    </Row>
                    <Row>
                        { error ?
                            <div className="bg-warning text-dark p-3">
                                Erreur de connexion
                            </div>
                            : null
                        }
                    </Row>
                    <Row>
                        <a href="#" className="" onClick={ lostPasswordClick }><small>Mot de passe oublié / wachtwoord vergeten</small></a>
                    </Row>
                    <Row>
                        <div className="row d-flex justify-content-center mt-4">
                            <Button variant="success" type="submit" className="p-2">
                                <i className="icon-user pr-2" />
                                Se connecter
                                { waiting && <img className="loadgif" src={LoadGif} alt="loading" /> }
                            </Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;

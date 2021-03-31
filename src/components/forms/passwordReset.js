import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoadGif from '../../images/hourglass.gif';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { handlePasswordReset, isLoggedIn } from "../../services/auth"
import { useQueryParam, StringParam } from "use-query-params";

const EmptyForm = {
    'password': null,
    'passwordbis': null,
    'token': null,
}

const PasswordResetForm = ({ lostPasswordClick }) => {

    const [formData, setFormData] = useState(EmptyForm);
    const [password, setPassword] = useState('');
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [token, setToken] = useQueryParam("token", StringParam)

    useEffect( () => {
        setFormData({...formData, token: token});
    }, [token])

    const handleUpdate = event => {
        let fdata = formData;
        fdata[event.target.name] = event.target.value;
        if (event.target.name == 'password') {
            setPassword(event.target.value);
        }
        setError(false);
        setFormData(fdata);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        event.stopPropagation();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            setValidated(true);
            setWaiting(false);
            return;
        }

        setWaiting(true);
        handlePasswordReset(
            formData,
            () => {
                navigate(`/?auth=subscribed`);
                NotificationManager.info('Password Updated', 'Info');
            },
            (msg=false) => {
                NotificationManager.error('Reset query failed', 'Error');
                if (msg) {
                NotificationManager.error(msg, 'Error');
                }
            }
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
                <h2 className="display-5 text-secondary mb-4">
                    Nouveau mot de passe<br /> Nieuw wachtwoord
                </h2>
                <Form
                  noValidate
                  validated={ validated }
                  method="post"
                  onSubmit={event => {
                    handleSubmit(event)
                  }}
                >
                    <Row>
                        <Form.Label className="w-100">
                            Mot passe / Wachtwoord
                          <Form.Control required name="password" type="password" onChange={ handleUpdate } />
                        </Form.Label>
                    </Row>
                    <Row>
                        <Form.Label className="w-100">
                          Répétez le mot de passe / Herhaal het wachtwoord
                          <Form.Control required name="passwordbis" type="password" pattern={ password } onChange={ handleUpdate } />
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
                        <div className="row d-flex justify-content-center mt-4">
                            <Button variant="success" type="submit" className="p-2">
                                <i className="icon-user pr-2" />
                                Envoyer / Doorsturen
                                { waiting && <img className="loadgif" src={LoadGif} alt="loading" /> }
                            </Button>
                        </div>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default PasswordResetForm;

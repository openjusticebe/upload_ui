import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoadGif from '../../images/hourglass.gif';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { handleLostPassword } from "../../services/auth"


const LostPasswordForm = () => {
    const [formData, setFormData] = useState({'email': null});
    const [waiting, setWaiting] = useState(false);
    const [error, setError] = useState(false);
    const [validated, setValidated] = useState(false);
    const [showText, setShowText] = useState(false);


    const handleUpdate = event => {
        let fdata = formData;
        fdata[event.target.name] = event.target.value;
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
        handleLostPassword(
            formData,
            () => {
                NotificationManager.info('Password reset sent', 'Info');
                setShowText(true);
            },
            (msg=false) => {
                NotificationManager.error('Reset query failed', 'Error');
                if (msg) {
                NotificationManager.error(msg, 'Error');
                }
            }
        );
    };



    return (
        <div className="container m-3 d-flex justify-content-center">
            <div className="col-6 mt-5">
                <h2 className="display-5 text-secondary mb-4">Mot de passe perdu<br />Wachtwoord vergeten</h2>
                <Form
                  noValidate
                  validated={ validated }
                  method="post"
                  onSubmit={event => {
                    handleSubmit(event)
                  }}
                >
                    <Row>
                        <div className="text-muted">
                        <p>
                        Ce formulaire envoie un lien de réinitialisation du mot de passe, sur votre addresse mail.
                        </p><p>
                        Dit formulier stuurt een link voor het opnieuw instellen van het wachtwoord, naar uw e-mailadres.
                        </p>
                        </div>
                    </Row>
                    <Row>
                        <Form.Label>
                            Email
                          <Form.Control name="email" type="email" onChange={ handleUpdate }  />
                        </Form.Label>
                    </Row>
                    <Row>
                        { error && (
                            <div className="bg-warning text-dark p-3">
                                Erreur de connexion
                            </div>
                        )}
                    </Row>
                    { showText ?
                    (<Row>
                            <div className="bg-success text-white p-3">
                                <p>
                                    Lien de réinitialisation envoyé par email.
                                </p>
                                <p>
                                    Reset link doorgestuurd per email.
                                </p>
                            </div>
                    </Row>)
                    :
                    (<Row>
                        <div className="row d-flex justify-content-center mt-4">
                            <Button variant="success" type="submit" className="p-2">
                                <i className="icon-user pr-2" />
                                Envoyer / Versturen
                                { waiting && <img className="loadgif" src={LoadGif} alt="loading" /> }
                            </Button>
                        </div>
                    </Row>)
                    }
                </Form>
            </div>
        </div>
    );
    
}

export default LostPasswordForm;

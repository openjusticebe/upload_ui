import React, {useState, useEffect} from "react";
import { navigate } from "gatsby";
import Form from 'react-bootstrap/Form';
import { Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import LoadGif from '../../images/hourglass.gif';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { handleSubscribe } from "../../services/auth"

const EmptyForm = {
    'fname': null,
    'lname': null,
    'email': null,
    'password': null,
    'interest': null,
    'profession': null,
    'description': null,
    'agree': false
}

const SubscribeForm = () => {

    const [validated, setValidated] = useState(false);
    const [waiting, setWaiting] = useState(false);
    const [formData, setFormData] = useState(EmptyForm);

    const handleSubmit = async event => {
        setWaiting(true);
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            setWaiting(false);
            return;
        }
        handleSubscribe(
            formData,
            () => {
                navigate(`/?auth=subscribed`);
                NotificationManager.info('User created', 'Info');
            },
            (msg=false) => {handleError(msg)}
        )
    };

    const handleError = (msg) => {
        setWaiting(false);
        if (msg) {
            NotificationManager.error(`Subscription error ${msg}`, 'Error');
        } else {
            NotificationManager.error('Subscription error', 'Error');
        }
    }

    const handleChange = async event => {
        const name = event.target.id;
        let fdata = formData;
        // FIXME: detect any checkbox or radio instead
        if (name === 'agree') {
            fdata['agree'] = event.target.checked;
        } else {
            fdata[name] = event.target.value;
        }
        setFormData(fdata);
    }

    return (
        <div>
            <h2>Inscription / Inschrijving</h2>
            <div className="p-4">
                <p>Vous souhaitez participer à la phase de test d'une solution de partage et de publication securisée et anonymisée de la jurisprudence ?</p>
                <p>Wilt u deelnemen aan de testfase van een oplossing voor het veilig en geanonimiseerd delen en publiceren van de rechtspraak?</p>
            </div>

            
            <Form noValidate
                validated={ validated }
                onSubmit={ handleSubmit }
                onChange={ handleChange } className="pl-3">
                <Form.Row>
                    <Form.Group as={Col} controlId="fname">
                        <Form.Label>Prénom / Voornaam</Form.Label>
                        <Form.Control required placeholder="Sacha" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lname">
                        <Form.Label>Nom de famille / Familienaam</Form.Label>
                        <Form.Control required placeholder="Jacobs" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="s.jacobs@example.com" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="password">
                        <Form.Label>Mot de passe / Wachtwoord</Form.Label>
                        <Form.Control required type="password" placeholder="****" />
                    </Form.Group>
                </Form.Row>

                <Form.Row>
                    <Form.Group as={Col} controlId="interest">
                        <Form.Label>Interesse voor / Intérêt pour OpenJustice</Form.Label>
                        <Form.Control as="select">
                            <option value="">Choisir / Kiezen</option>
                            <option value="test">Nieuwsgierigheid / Curiosité</option>
                            <option value="share">Rechtspraak delen / Partager jurisprudence</option>
                            <option value="participate">Deelnemen aan de gemeenschap / Participer à la communauté</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="profession">
                        <Form.Label>Professionele activiteit / Activité professionnelle</Form.Label>
                        <Form.Control required as="select">
                            <option value="">Choisir / Kiezen</option>
                            <option value="avocat">Avocat / Advocaat</option>
                            <option value="magistrat">Magistrat / Magistraat</option>
                            <option value="juriste">Juriste / Jurist</option>
                            <option value="documentaliste">Documentaliste / Documentalist</option>
                            <option value="traducteur">Traducteur.trice / Vertaler</option>
                            <option value="académicien">Académicien.ne / Academicus</option>
                            <option value="chercheur">Chercheur / Onderzoeker</option>
                            <option value="etudiant">Étudiant.e / Student</option>
                            <option value="developpeur">Développeur.euse / Ontwikkelaar</option>
                            <option value="autre">Autre / Overige</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="description">
                    <Form.Label>Un mot sur vous / Een woord over u</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>

                <Form.Group controlId="agree">
                    <Form.Check required type="checkbox" label="J'accepte les conditions d'utilisation du service / Ik accepteer de gebruiksvoorwaarden van de dienst" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Envoyer / Verzenden
                    {waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                </Button>
            </Form>
        </div>
    );
}

export default SubscribeForm;

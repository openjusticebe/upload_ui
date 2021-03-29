import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { navigate } from "gatsby"
import { Row } from 'react-bootstrap';
import { handleLogin, isLoggedIn } from "../services/auth"
import LoadGif from '../images/hourglass.gif';

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
        waiting: false,
        error: false,
    };

    handleUpdate = event => {
        this.setState({
          [event.target.name]: event.target.value,
          error: false,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ waiting: true });
        handleLogin(
            this.state,
            () => {navigate(`/`)},
            () => {this.handleError()}
        );
    };

    handleError = () => {
        this.setState({
            error: true,
            waiting: false,
        })
    };

    render() {
        if (isLoggedIn()) {
            navigate(`/admin`);
        };

        return (
            <div className="container m-3 d-flex justify-content-center">
                <div className="col-6 mt-5">
                    <h2 className="display-5 text-secondary">Connexion utilisateur</h2>
                    <Form
                      method="post"
                      onSubmit={event => {
                        this.handleSubmit(event)
                      }}
                    >
                        <Row>
                            <Form.Label>
                                Email
                              <Form.Control name="username" type="text" onChange={this.handleUpdate} />
                            </Form.Label>
                        </Row>
                        <Row>
                            <Form.Label>
                              Mot de passe
                              <Form.Control name="password" type="password" onChange={this.handleUpdate} />
                            </Form.Label>
                        </Row>
                        <Row>
                            { this.state.error ?
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
                                    Se connecter
                                    {this.state.waiting && <img className="loadgif" src={LoadGif} alt="loading" />}
                                </Button>
                            </div>
                        </Row>
                    </Form>
                </div>
            </div>
        );
  }
}

export default Login

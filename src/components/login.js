import React from "react"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { navigate } from "gatsby"
import { Row, Col} from 'react-bootstrap';
import { handleLogin, isLoggedIn } from "../services/auth"

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
    };

    handleUpdate = event => {
        this.setState({
          [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async event => {
        event.preventDefault();
        await handleLogin(this.state);
        navigate(`/admin`);
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
                        navigate(`/admin`)
                      }}
                    >
                        <Row>
                            <Form.Label>
                              Username
                              <Form.Control name="username" type="text" onChange={this.handleUpdate} />
                            </Form.Label>
                        </Row>
                        <Row>
                            <Form.Label>
                              Password
                              <Form.Control name="password" type="password" onChange={this.handleUpdate} />
                            </Form.Label>
                        </Row>
                        <Row>
                            <div className="row d-flex justify-content-center mt-4">
                                <Button variant="success" type="submit" className="p-1">
                                    <i className="icon-user pr-2" />
                                    Se connecter
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

import React from "react"
import { navigate } from "gatsby"
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
          <>
            <h1>Log in</h1>
            <form
              method="post"
              onSubmit={event => {
                this.handleSubmit(event)
                navigate(`/admin`)
              }}
            >
              <label>
                Username
                <input type="text" name="username" onChange={this.handleUpdate} />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  onChange={this.handleUpdate}
                />
              </label>
              <input type="submit" value="Log In" />
            </form>
          </>
        );
  }
}

export default Login

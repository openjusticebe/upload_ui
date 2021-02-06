import React from "react"
import { Router } from "@reach/router"
import { navigate, Link } from "gatsby"
import Login from "../components/login";
import PrivateRoute from "../components/privateRoute"
import { getUser, isLoggedIn, logout } from "../services/auth"

const Unsecure = () => 
    (<div className="container m-3">
        Utilisateur deconnecté
    </div>);

const Secure = () =>  {
    const usr = getUser();

    return (<div className="container m-3">
        Utilisateur connecté
            <dl className="row border mt-3">
                <dt className="col-3"> Utilisateur </dt>
                <dd className="col-9"> { usr['username'] } </dd>
                <dt className="col-3"> E-mail </dt>
                <dd className="col-9"> { usr['email'] } </dd>
            </dl>
    </div>);
}

const Review = () => <p>Review</p>

const Admin = () => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Outil/Admin</a>
        <div className="">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item"><Link className="nav-link" to="/admin">Home</Link></li>
                { isLoggedIn() ? (
                    <li className="nav-item"><Link className="nav-link" to="/admin/review">Review</Link></li>
                    ) : (
                    <li className="nav-item"><Link className="nav-link" to="/admin/login">Login</Link></li>
                    )
                }
                {isLoggedIn() ? (
                  <a href="/" className="nav-link" onClick={event => {
                      event.preventDefault()
                      logout(() => navigate(`/admin`))
                    }}
                  >
                    Logout
                  </a>
                ) : null}
            </ul>
        </div>
    </nav>
    <Router>
        { isLoggedIn() ? (<Secure path="/admin" />) : ( <Unsecure path="/admin" /> )}
        <PrivateRoute path="/admin/review" component={Review} />
        { isLoggedIn() ? null : (<Login path="/admin/login" />) }
    </Router>
  </div>
)

export default Admin

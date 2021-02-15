import React, {useState, useEffect } from "react"
import { Router } from "@reach/router"
import { navigate, Link } from "gatsby"
import Login from "../components/login";
import PrivateRoute from "../components/privateRoute"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../services/auth"
import Review from "../components/admin/review"
import Published from "../components/admin/published"
import Flagged from "../components/admin/flagged"
import Other from "../components/admin/other"
import Edit from "../components/admin/edit"
import Bar from "../components/version_bar"
import { useQueryParam, StringParam } from "use-query-params";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

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


const Admin = () => {
    const [auth, setAuth] = useQueryParam("auth", StringParam);

    useEffect(() => {
        switch(auth) {
            case 'reset':
                logout(() => navigate(`/admin?auth=logout`));
                break;
        }
        setAuth('ok');
    }, [auth]);

    useEffect(() => {
        if (isLoggedIn())
            NotificationManager.info('Utilisateur connecté', 'Info');
        else
            NotificationManager.warning('Utilisateur déconnecté', 'Info');
    }, [isLoggedIn()]);

    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <a className="navbar-brand" href="#">Outil/Admin</a>
              <div className="">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item"><Link className="nav-link" to="/admin">Home</Link></li>
                      { isLoggedIn() ? (
                          <>
                              <li className="nav-item"><Link className="nav-link" to="/admin/review">Nouveaux</Link></li>
                              <li className="nav-item"><Link className="nav-link" to="/admin/published">Publiés</Link></li>
                              <li className="nav-item"><Link className="nav-link" to="/admin/flagged">Signalés</Link></li>
                              <li className="nav-item"><Link className="nav-link" to="/admin/other">Autre</Link></li>
                          </>
                          ) : (
                          <li className="nav-item"><Link className="nav-link" to="/admin/login">Login</Link></li>
                          )
                      }
                      {isLoggedIn() ? (
                        <a href="/" className="nav-link" onClick={event => {
                            event.preventDefault()
                            logout(() => navigate(`/admin?auth=logout`))
                          }}
                        >
                          Logout
                        </a>
                      ) : null}
                  </ul>
              </div>
          </nav>
          <Bar />
          <Router>
              { isLoggedIn() ? (<Secure path="/admin" />) : ( <Unsecure path="/admin" /> )}
              <PrivateRoute path="/admin/review" component={Review} />
              <PrivateRoute path="/admin/published" component={Published} />
              <PrivateRoute path="/admin/flagged" component={Flagged} />
              <PrivateRoute path="/admin/other" component={Other} />
              <PrivateRoute path="/admin/edit/:docid" component={Edit} />
              { isLoggedIn() ? null : (<Login path="/admin/login" />) }
          </Router>
          <NotificationContainer/>
        </div>
)};

export default Admin

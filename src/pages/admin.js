import React from "react"
import { Router } from "@reach/router"
import { navigate, Link } from "gatsby"
import Login from "../components/login";
import PrivateRoute from "../components/privateRoute"
import { getUser, isLoggedIn, logout } from "../services/auth"

const Unsecure = () => <p>Not logged in</p>
const Secure = () => <p>Logged in</p>
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

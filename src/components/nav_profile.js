import React from "react"
import { navigate,Link } from "gatsby"
import { getUser, isLoggedIn, logout, logcheck } from "../services/auth"

const UserMenu = () => {
    const usr = getUser();

    return (
    <>
        <ul className="navbar-nav ml-auto pl-5" style={{'justifyContent' : 'flex-end' }}>
              { isLoggedIn() ? (
                  <>
                  <li> { usr['username'] } </li>
                  <li className="nav-item mx-2"><Link to="/admin" className="nav-link btn btn-outline-dark">Admin</Link></li>
                  <li className="nav-item mx-2"><a href="/" className="nav-link btn btn-dark" onClick={event => {
                        event.preventDefault()
                        logout(() => navigate(`/`))
                      }}>Disconnect</a></li>
                  </>
              ) : (
                  <>
                  <li className="nav-item mx-2"><Link to="/subscribe" className="nav-link btn btn-outline-primary">Subscribe</Link></li>
                  <li className="nav-item mx-2"><Link to="/login" className="nav-link btn btn-primary">Connect</Link></li>
                  </>
            )}
        </ul>
    </>);
}

export default UserMenu

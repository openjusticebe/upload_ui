import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"

import OJLogo from "../../images/openjustice_bw.png"
import Bar from "../version_bar"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="/admin">
          <img src={ OJLogo } style={{ "width": 190, "height": 'auto' }}/>
        </Link>
        <ul className="navbar-nav mr-auto" style={{ "width" : "auto", "justifyContent": "start"}}>
          { isLoggedIn() ? (
              <>
                  <li className="nav-item mx-3"><Link className="nav-link" to="/admin/review">Nouveaux</Link></li>
                  <li className="nav-item mx-3"><Link className="nav-link" to="/admin/waiting">En attente</Link></li>
                  <li className="nav-item mx-3"><Link className="nav-link" to="/admin/published">Publiés</Link></li>
                  <li className="nav-item mx-3"><Link className="nav-link" to="/admin/flagged">Signalés</Link></li>
                  <li className="nav-item mx-3"><Link className="nav-link" to="/admin/deleted">Corbeille</Link></li>
                  <li className="nav-item mx-3"><a href="/" className="nav-link" onClick={event => {
                        event.preventDefault()
                        logout(() => navigate(`/admin?auth=logout`))
                      }}>Déconnexion</a></li>
              </>
              ) : (
              <li className="nav-item mx-3"><Link className="nav-link" to="/admin/login">Connexion</Link></li>
              )
          }
          <li className="nav-item ml-3"><Link className="nav-link text-muted" to="/">Outil</Link></li>
        </ul>
      </div>
      <Bar />
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

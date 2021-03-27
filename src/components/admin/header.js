import { navigate, Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { isLoggedIn, logout } from "../../services/auth"
import UserMenu from "../../components/nav_profile"

import OJLogo from "../../images/openjustice_bw.png"
import Bar from "../version_bar"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="/admin">
          <img src={ OJLogo } style={{ "width": 190, "height": 'auto' }} alt="OpenJustice.be Admin"/>
        </Link>
        <nav class="navbar navbar-expand-lg">
            <ul className="navbar-nav mr-auto">
              { isLoggedIn() ? (
                  <>
                      <li className="nav-item mx-1"><Link className="nav-link" to="/admin/review">Nouveaux</Link></li>
                      <li className="nav-item mx-1"><Link className="nav-link" to="/admin/waiting">Attente</Link></li>
                      <li className="nav-item mx-1"><Link className="nav-link" to="/admin/published">Publiés</Link></li>
                      <li className="nav-item mx-1"><Link className="nav-link" to="/admin/flagged">Signalés</Link></li>
                      <li className="nav-item mx-1"><Link className="nav-link" to="/admin/deleted">Corbeille</Link></li>
                  </>
                  ) : ''
              }
            </ul>
            <UserMenu isAdmin={ true }/>
        </nav>
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

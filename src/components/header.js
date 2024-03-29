import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import OJLogo from "../images/openjustice_tq.png"
import Bar from "../components/version_bar"
import UserMenu from "../components/nav_profile"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="/">
          <img src={ OJLogo } style={{ "width": 190, "height": 'auto' }} alt="OpenJustice.be"/>
        </Link>
        <nav class="navbar navbar-expand-lg">
            <ul className="navbar-nav mr-auto" >
              <li className="nav-item mx-3"><Link className="nav-link" to="https://openjustice.be">Information</Link></li>
              <li className="nav-item mx-3"><Link className="nav-link" to="https://airtable.com/shrLQOPwbu7IclErU">Participate</Link></li>
              <li className="nav-item mx-3"><Link className="nav-link" to="http://openjustice.be/wp-content/uploads/2020/11/pilot1.pdf">Guide</Link></li>
              <li className="nav-item mx-3"><a className="nav-link" href="mailto:team@openjustice.be">Contact</a></li>
            </ul>
            <UserMenu />
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

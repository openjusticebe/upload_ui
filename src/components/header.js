import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import OJLogo from "../images/openjustice_tq.png"
import Bar from "../components/version_bar"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="https://openjustice.be">
          <img src={ OJLogo } style={{ "width": 190, "height": 'auto' }} alt="OpenJustice.be"/>
        </Link>
        <ul className="navbar-nav mr-auto" style={{ "width" : "auto", "justifyContent": "start"}}>
          <li className="nav-item mx-3"><Link className="nav-link" to="https://openjustice.be">Information</Link></li>
          <li className="nav-item mx-3"><Link className="nav-link" to="https://airtable.com/shrLQOPwbu7IclErU">Participate</Link></li>
          <li className="nav-item mx-3"><Link className="nav-link" to="http://openjustice.be/wp-content/uploads/2020/11/pilot1.pdf">Guide</Link></li>
          <li className="nav-item mx-3"><a className="nav-link" href="mailto:team@openjustice.be">Contact</a></li>
          <li className="nav-item mx-3"><Link to="/admin" className="nav-link text-muted">Admin</Link></li>
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

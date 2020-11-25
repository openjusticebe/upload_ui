import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import OJLogo from "../images/openjustice.png"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="https://openjustice.be">
          <img src={ OJLogo } />
        </Link>
        <ul>
          <li><Link to="https://openjustice.be">Information</Link></li>
          <li><Link to="https://airtable.com/shrLQOPwbu7IclErU">Participate</Link></li>
          <li><Link to="http://openjustice.be/wp-content/uploads/2020/11/pilot1.pdf">Guide</Link></li>
          <li><a href="mailto:team@openjustice.be">Contact</a></li>
        </ul>
      </div>
      <div className="construction" >
        <div>
          <div className="content">
            <span> version 0.1 - early release</span>
          </div>
        </div>
      </div>
    </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

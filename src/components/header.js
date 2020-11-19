import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import OJLogo from "../images/openjustice.png"

const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link>
          <img src={ OJLogo } />
        </Link>
        <ul>
          <li><Link to="https://openjustice.be">Information</Link></li>
          <li><Link to="https://openjustice.be">Subscribe</Link></li>
          <li><Link to="https://openjustice.be">Support</Link></li>
          <li><Link to="https://openjustice.be">Contact</Link></li>
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

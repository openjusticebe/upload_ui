import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import OJLogo from "../images/openjustice.png"

import LanguageSelector from '../components/languageSelector'


const Header = ({ siteTitle }) => (
    <header>
      <div className="hero">
        <Link to="https://openjustice.be">
          <img src={ OJLogo } />
        </Link>
        <ul>
          <li><Link to="https://openjustice.be/2020/05/23/open-justice/">Information</Link></li>
          <li><Link to="https://openjustice.be">Subscribe</Link></li>
          <li><Link to="https://openjustice.be/contact/">Contact</Link></li>
        </ul>
        
        <LanguageSelector />
      </div>
      <div className="construction" >
        <div>
          <div className="content">
            <span>Version 0.1 - early release</span>
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

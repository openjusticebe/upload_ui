import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Footer = ({ siteTitle }) => (
    <footer class="footer">
             <div class="container">
               <small class="text-muted text-center">
                 Developed with ❤️ by
                 <em>
             {` `}
             <a href="https://openjustice.be/">OpenJustice.be</a>
             
             </em>
             {` | `} {new Date().getFullYear()} {` – `} now.
             <br />
            Source code available at
            <a
                href="https://github.com/openjusticebe/"
                target="_blank"
            >
            GitHub
            </a>
            — 
            Licensed with
            <a
                href="https://raw.githubusercontent.com/openjusticebe/ui-assets/main/LICENSE"
            >
            GPLv3
            </a>
            .
             </small>
             </div>
    </footer>
)

export default Footer




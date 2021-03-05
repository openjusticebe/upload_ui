import React from "react"

const Footer = ({ siteTitle }) => (
    <footer className="footer">
             <div className="container">
               <small className="text-center">
                 Developed with ❤️ by
                 <em>
             {` `}
             <a href="https://openjustice.be/">OpenJustice.be</a>
             
             </em>
             {` | `} {new Date().getFullYear()} {` – `} now.
             <br />
            Source code available at <a
                href="https://github.com/openjusticebe/"
            >GitHub</a>
            — 
            Licensed with <a
                href="https://raw.githubusercontent.com/openjusticebe/ui-assets/main/LICENSE"
            >
            GPLv3
            </a>
            .
             </small>
             </div>
    </footer>
);

export default Footer




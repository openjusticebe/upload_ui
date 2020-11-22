import React, { useState, useEffect} from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import Editor from "../components/editor";
// import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/style.scss";
import PreviewUi from "../components/ui_preview";

class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                <div className="container">
                    <div className="row justify-content-center info">
                        <div className="col-5">
                            <h2>Merci !</h2>
                            Votre document attend désormais vérification avant d'être publié
                        </div>
                        <div className="col-5">
                            <h2>Bedankt !</h2>
                            Uw document wacht nu op verificatie voordat het wordt gepubliceerd
                        </div>
                    </div>
                    <div className="row mt-3">
                        <PreviewUi />
                    </div>
                    <div className="row mt-3">
                        <Link to="/">&lt; Retour / Terug</Link> 
                    </div>
                </div>
            </Layout>
        )
    }
}

export default SuccessPage
            

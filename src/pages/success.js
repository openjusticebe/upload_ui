import React  from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import "../styles/style.scss";
import PreviewUi from "../components/ui_preview";

class SuccessPage extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                <div className="container">
                    <div className="row justify-content-center info">
                        <div className="col-5">
                            <h2>Bravo !</h2>
                            Votre document attend désormais vérification et validation avant d'être intégré dans la banque de données publique.
                        </div>
                        <div className="col-2">
                            <img src={ clapgif} alt="bravo !"/>
                        </div>
                        <div className="col-5">
                            <h2>Super !</h2>
                            Uw document wacht nu op verificatie en validatie voor dat het word geintegreerd in de openbare databank.
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
            

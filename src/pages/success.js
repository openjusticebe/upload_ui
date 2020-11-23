import React, { useState, useEffect} from "react";
import { graphql, Link } from "gatsby";

import Layout from "../components/layout";
import Editor from "../components/editor";
// import Image from "../components/image";
import SEO from "../components/seo";
import "../styles/style.scss";
import PreviewUi from "../components/ui_preview";
import { useTranslation } from 'react-i18next';


class SuccessPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t, i18n } = useTranslation()

        return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                <div className="container">
                    <div className="row justify-content-center info">
                        <div className="col-10">
                            <h2>{t('thanks')}</h2>
                            <p>{t('result.info')}</p>
                            
                        </div>
                
                    </div>
                    <div className="row mt-3">
                        <PreviewUi />
                    </div>
                    <div className="row mt-3">
                        <Link to="/">&lt; {t('back')}</Link> 
                    </div>
                </div>
            </Layout>
        )
    }
}

export default SuccessPage
            

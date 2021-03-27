import React  from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import "../styles/style.scss";
import SubscribeForm from "../components/forms/subscribe";

class SubscribePage extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="OJ / Subscription" />
                <SubscribeForm />
            </Layout>
        )
    }
}

export default SubscribePage

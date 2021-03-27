import React  from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import "../styles/style.scss";
import Login from "../components/login";

class LoginPage extends React.Component {
    render() {
        return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                <Login />
            </Layout>
        )
    }
}

export default LoginPage
            

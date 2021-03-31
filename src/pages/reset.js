import React, {useState, useEffect} from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import "../styles/style.scss";
import PasswordResetForm from "../components/forms/passwordReset";

const ResetPage = () => {
    return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                <PasswordResetForm  />
            </Layout>
    )
}

export default ResetPage

import React, {useState, useEffect} from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import clapgif from "../images/clapclap.gif";
import SEO from "../components/seo";
import "../styles/style.scss";
import LoginForm from "../components/forms/login";
import LostPasswordForm from "../components/forms/lostPassword";

const LoginPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showLost, setShowLost] = useState(false);

    const handleLostPassword = () => {
        setShowLogin(false);
        setShowLost(true);
    }
    return (
            <Layout>
                <SEO title="OJ / Upload Alpha" />
                { showLogin && <LoginForm lostPasswordClick={ handleLostPassword } />}
                { showLost && <LostPasswordForm  />}
            </Layout>
    )
}

export default LoginPage

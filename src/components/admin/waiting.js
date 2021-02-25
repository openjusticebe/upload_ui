import React, {useState, useEffect } from "react"
import { navigate } from "gatsby"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Waiting = () => {
    // Client-side Runtime Data Fetching
    const [hiddenList, setHiddenList] = useState(false);
    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/c/hidden`, {
            headers : {"Authorization" : getAuthHeader()}
        })
        .then(resp => { 
            if (resp.status === 200) {
                return resp.json();
            } else {
                throw new Error('Bad Return Status')
            }
        })
        .then(resultData => {
            setHiddenList(resultData);
        })
        .catch(error => {
            navigate(`/admin?auth=reset`);
        });
    }, []);


    return (
        <>
            <div className="container m-3">
                <h2 className="display-5 text-secondary">Documents Cachés</h2>
                <p className="text-muted">Documents qui sont inaccessibles en attente de traitement</p>
                <DocList list={ hiddenList } />
            </div>
        </>
    );
}

export default Waiting;

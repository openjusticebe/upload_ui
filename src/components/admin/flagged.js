import React, {useState, useEffect } from "react"
import { navigate } from "gatsby"
import { getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Flagged = () => {
    // Client-side Runtime Data Fetching
    const [flaggedList, setFlaggedList] = useState(false);
    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/c/flagged`, {
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
            setFlaggedList(resultData);
        })
        .catch(error => {
            navigate(`/admin?auth=reset`);
        });
    }, []);

    return (
        <div className="container m-3">
            <h2 className="display-5 text-secondary">Documents Signalés</h2>
            <p className="text-muted">Documents que les utilisateurs ont signalés pour diverses raisons</p>
            <DocList list={ flaggedList } />
        </div>
    );
}

export default Flagged;

import React, {useState, useEffect } from "react"
import { navigate } from "gatsby"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Other = () => {
    // Client-side Runtime Data Fetching
    const [hiddenList, setHiddenList] = useState([]);
    const [deletedList, setDeletedList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5005/c/hidden`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json())
            .then(resultData => {
                setHiddenList(resultData);
            })
            .catch(error => {
                navigate(`/admin?auth=reset`);
            });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:5005/c/deleted`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json())
            .then(resultData => {
                setDeletedList(resultData);
            })
    }, []);

    return (
        <>
            <div className="container m-3">
                <h2 className="display-5 text-secondary">Documents Cachés</h2>
                <p className="text-muted">Documents qui sont inaccessibles pour diverses raisons</p>
                <DocList list={ hiddenList } />
            </div>
            <div className="container m-3">
                <h2 className="display-5 text-secondary">Corbeille</h2>
                <p className="text-muted">Documents retirés en attente de suppression définitive</p>
                <DocList list={ deletedList } />
            </div>
        </>
    );
}

export default Other;

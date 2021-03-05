import React, {useState, useEffect } from "react"
import { navigate } from "gatsby"
import { getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Deleted = () => {
    // Client-side Runtime Data Fetching
    const [deletedList, setDeletedList] = useState(false);
    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/c/deleted`, {
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
            setDeletedList(resultData);
        })
        .catch(error => {
            navigate(`/admin?auth=reset`);
        });
    }, []);

    return (
        <>
            <div className="container m-3">
                <h2 className="display-5 text-secondary">Corbeille</h2>
                <p className="text-muted">Documents retirés en attente de suppression définitive</p>
                <DocList list={ deletedList } />
            </div>
        </>
    );
}

export default Deleted;

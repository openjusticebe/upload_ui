import React, {useState, useEffect } from "react"
import { navigate } from "gatsby"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Published = () => {
    // Client-side Runtime Data Fetching
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/c/public`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json())
            .then(resultData => {
                setReviewList(resultData);
            })
            .catch(error => {
                setReviewList([]);
                navigate(`/admin?auth=reset`);
            });
    }, []);

    return (
        <div className="container m-3">
            <h2 className="display-5 text-secondary">Documents Publiés</h2>
            <p className="text-muted">Documents actuellement publiés par OpenJustice</p>
            <DocList list={ reviewList } />
        </div>
    );
}

export default Published;

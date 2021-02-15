import React, {useState, useEffect } from "react"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocList from "./doclist"
import { navigate } from "gatsby"

const Review = () => {
    // Client-side Runtime Data Fetching
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        fetch(`${process.env.GATSBY_DATA_API}/c/review`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json())
            .then(resultData => {
                setReviewList(resultData);
            })
            .catch(error => {
                navigate(`/admin?auth=reset`);
            });
    }, []);

    return (
        <div className="container m-3">
            <h2 className="display-5 text-secondary">Nouveaux Documents</h2>
            <p className="text-muted">Documents qui récemment soumis qui doivent être modérés avant publication.</p>
            <DocList list={ reviewList } />
        </div>
    );
}

export default Review;

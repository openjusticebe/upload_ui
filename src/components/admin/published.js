import React, {useState, useEffect } from "react"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"
import DocList from "./doclist"

const Published = () => {
    // Client-side Runtime Data Fetching
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5005/c/public`, {
            headers : {"Authorization" : getAuthHeader()}
        })
            .then(response => response.json()) // parse JSON from request
            .then(resultData => {
                console.log(resultData);
                setReviewList(resultData);
            }) // set data for the number of stars
    }, []);

    return (
        <div className="container m-3">
            <p>Publiés</p>
            <DocList list={ reviewList } />
        </div>
    );
}

export default Published;

import React, {useState, useEffect } from "react"
import { Link } from "gatsby"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"

const Review = () => {
    // Client-side Runtime Data Fetching
    const [reviewList, setReviewList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5005/c/review`, {
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
            <p>Review</p>
            <table className="table table-bordered table-hover table-sm">
                <thead className="thead-dark">
                <tr>
                    <th className="col" style={{width:'20%'}}>Id</th>
                    <th className="col">Ecli</th>
                </tr>
                </thead>
                <tbody>
                { reviewList.map((item) => (
                    <tr key={ item.id }>
                        <td>
                            <Link to={"/admin/edit/" + item.id}>
                                <i className="icon-pencil pr-2" />
                                { item.id }
                            </Link>
                        </td>
                        <td>{ item.ecli }</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Review;

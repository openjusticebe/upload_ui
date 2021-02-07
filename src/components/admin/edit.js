import React, {useState, useEffect } from "react"
import { getUser, isLoggedIn, logout, getAuthHeader } from "../../services/auth"

const Edit = ({docid}) => 
    (<div className="container m-3">
        Edition document <b>{ docid }</b>
    </div>);

export default Edit;

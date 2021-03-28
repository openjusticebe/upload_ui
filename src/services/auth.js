export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {};

export const getAuthHeader = () => {
    if (isBrowser() && window.localStorage.getItem("gatsbyToken")) {
        const token = JSON.parse(window.localStorage.getItem("gatsbyToken"));
        return `${token.token_type} ${token.access_token}`;
    }
    return {};
}

export const getToken = () => {
    if (isBrowser() && window.localStorage.getItem("gatsbyToken")) {
        const token = JSON.parse(window.localStorage.getItem("gatsbyToken"));
        return token.access_token;
    }
    return '';
}

const setUser = user =>
    window.localStorage.setItem("gatsbyUser", JSON.stringify(user));

const setToken = token =>
    window.localStorage.setItem("gatsbyToken", JSON.stringify(token));

export const handleLogin = async ({ username, password }, callback, error_callback) => {
    // comment
    const payload = new URLSearchParams({
                grant_type: '',
                username: username,
                password: password,
                scope: '',
                client_id: '',
                client_secret: '',
    });
    return fetch(`${process.env.GATSBY_USER_API}/token`, {
        method : `post`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        body : payload
    })
    .then(resp => {
        if (resp.status === 200) {
            return resp.json();
        } else {
            error_callback();
        }
    })
    .then(token => {
        setToken(token);
        return fetch(`${process.env.GATSBY_USER_API}/u/me`, {
            headers: {
                "Authorization" : `${token.token_type} ${token.access_token}`
            }
        });
    })
    .then(resp => resp.json())
    .then(data => {
        setUser(data);
        callback();
    })
    .catch(err => {
        error_callback();
    });
}

export const handleSubscribe = async ({
    fname,
    lname,
    email,
    password,
    interest,
    profession,
    description,
}, callback, error_callback) => {

    const payload = new URLSearchParams({
        fname: fname,
        lname: lname,
        email: email,
        password: password,
        interest: interest,
        profession: profession,
        description: description
    });

    return fetch(`${process.env.GATSBY_USER_API}/f/new_user`, {
        method: `post`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        body : payload
    })
    .then(resp => {
        if (resp.status === 200) {
            return resp.json();
        } else {
            error_callback('Bad account creation response');
        }
    })
    .then(data => {
        console.log(data);
        return handleLogin({username: email, password: password}, callback, error_callback);
    })
    .catch(err => {
        console.log(err);
        error_callback('Catched error');
    });
}


export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}

export const logcheck = callback => {
    fetch(`${process.env.GATSBY_USER_API}/u/me`, {
        headers: {
            "Authorization" : getAuthHeader()
        }
    }).then(resp => {
        if (resp.status === 200) {
            return;
        } else {
            logout(callback);
        }
    }).catch(err => {
        logout(callback);
    });
}

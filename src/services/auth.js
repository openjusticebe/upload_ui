export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

const setToken = token =>
  window.localStorage.setItem("gatsbyToken", JSON.stringify(token))

export const handleLogin = async ({ username, password }) => {
    const payload = new URLSearchParams({
                grant_type: '',
                username: username,
                password: password,
                scope: '',
                client_id: '',
                client_secret: '',
    })
    let resp = await fetch(`http://localhost:5005/token`, {
        method : `post`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json",
        },
        body : payload
    })
    .then(resp => {
        if (resp.status === 200) {
            return resp.json()
        } else {
            return Promise.reject("server")
        }
    })
    .then(token => {
        setToken(token);
        return fetch(`http://localhost:5005/users/me`, {
            headers: {
                "Authorization" : `${token.token_type} ${token.access_token}`
            }
        });
    })
    .then(resp => resp.json())
    .catch(err => {
        return false
    });

    return setUser(resp);
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}

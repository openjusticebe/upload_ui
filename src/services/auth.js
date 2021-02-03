export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("gatsbyUser")
    ? JSON.parse(window.localStorage.getItem("gatsbyUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

export const handleLogin = async ({ username, password }) => {
    const payload = new URLSearchParams({
                grant_type: '',
                username: username,
                password: password,
                scope: '',
                client_id: '',
                client_secret: '',
    })
    let response = await fetch(`http://localhost:5005/token`, {
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
            console.log("Status: " + resp.status)
            return Promise.reject("server")
        }
    })
    .then(dataJson => JSON.parse(dataJson))
    .catch(err => {
        console.log(err)
        return false
    });

    console.log(`Received: ${response}`)      

    if (username === `john` && password === `pass`) {
      return setUser({
        username: `john`,
        name: `Johnny`,
        email: `johnny@example.org`,
      })
    }
  return false
}

export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}

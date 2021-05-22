import React, {useCallback} from 'react'

const localStorageName = 'userData'

const AuthHook = () => {
    const [token, setToken] = React.useState(null)
    const [userId, setUserId] = React.useState(null)
    const [email, setEmail] = React.useState(null)

    const login = useCallback((token, id, emailArg) => {
        setToken(token)
        setUserId(id)
        setEmail(emailArg)
        localStorage.setItem(localStorageName, JSON.stringify({token, userId: id, email}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(localStorageName)
    }, [])

    React.useEffect(() => {
        const data = JSON.parse(localStorage.getItem(localStorageName))
        if(data && data.token) {
            login(data.token, data.userId, data.email)
        }
    }, [login])

    return {login, logout, token, userId, email}
}

export default AuthHook

import React, {useCallback} from 'react'

const localStorageName = 'userData'

const AuthHook = () => {
    const [token, setToken] = React.useState(null)
    const [userId, setUserId] = React.useState(null)

    const login = useCallback((token, id) => {
        setToken(token)
        setUserId(id)
        localStorage.setItem(localStorageName, JSON.stringify({token, userId: id}))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem(localStorageName)
    }, [])

    React.useEffect(() => {
        const data = localStorage.getItem(localStorageName)
        if(data && data.token) {
            login(data.token, data.userId)
        }
    }, [login])

    return {login, logout, token, userId}
}

export default AuthHook

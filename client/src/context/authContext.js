import React, {createContext} from 'react'

const noop = (token, userId, email) => {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    email: null,
    login: noop,
    logout: noop,
})

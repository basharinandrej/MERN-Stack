import React, {createContext} from 'react'

const noop = (token, userId) => {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: noop,
    logout: noop,
})

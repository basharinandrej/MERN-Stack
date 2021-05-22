import React, {useContext, useEffect} from 'react'
import './AuthPage.css'
import {useHttp} from "../../hooks/http.hooks";
import {AuthContext} from "../../context/authContext";

const AuthPade = () => {
    const {login} = useContext(AuthContext)
    const {request, error, clearError} = useHttp()
    const [form, setForm] = React.useState<object>({})

    useEffect(() => {
        error && alert(error)
        clearError()
    }, [error])

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    const clickHandler = async (e: React.MouseEvent) => {
        e.preventDefault()

        try {
            const data = await request(
                'api/auth/register',
                'POST',
                {...form}
            )

            data && alert(data.message)
        } catch (e) {}
    }

    const loginHandler = async (e: React.MouseEvent) => {
        e.preventDefault()

        try {
            const data = await request(
                'api/auth/login',
                'POST',
                {...form}
            )
            login(data.token, data.userId, data.email)
        } catch (e) {}
    }
    return (
        <div className="auth-page">
            <h1 className="auth-page__title">AuthPage</h1>

            <form className="form">
                <input
                    name="email"
                    type="text"
                    className="form__input input"
                    onChange={changeHandler}
                />
                <input
                    name="password"
                    type="password"
                    className="form__input input"
                    onChange={changeHandler}
                />

                <div className="form__wrapper">
                    <button
                        onClick={clickHandler}
                    >
                        Регистрация
                    </button>
                    <button
                        onClick={loginHandler}
                    >
                        Вход
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AuthPade

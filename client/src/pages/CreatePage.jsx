import React, {useContext} from 'react'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/authContext";

const CreatePage = () => {
    const {request} = useHttp()
    const [ link, setLink ]= React.useState('')
    const {token} = useContext(AuthContext)

    const pressHandler = async e => {
        e.preventDefault()

        if (e.key === 'Enter') {
            try {
                const data = await request('/api/link/generation', 'POST', {from: link}, {
                    Authorization: `Bearer ${token}`
                })
                console.log('data', data);
            } catch (e) {}
        }
    }
    return (
        <>
            <h1>CreatePage</h1>

            <form>
                <input
                    type="text"
                    value={link}
                    onKeyPress={pressHandler}
                    onChange={e => setLink(e.target.value)}
                />
            </form>
        </>

    )
}

export default CreatePage

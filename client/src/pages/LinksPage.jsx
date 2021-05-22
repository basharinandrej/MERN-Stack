import React, {useContext} from 'react'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/authContext";
import {useHistory} from "react-router-dom";

const LinksPage = () => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const [links, setLinks] = React.useState([])
    const history = useHistory()

    React.useEffect(async () => {
        try {
            const data = await request(
                'api/link',
                'GET', null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            console.log('data', data);
            setLinks(data)
        } catch (e) {
            console.log('e', e);
        }
    }, [])

    const detailsHandler = id => {
        history.push(`/details/${id}`)
    }

    return (
        <>
            <h1>LinksPage</h1>
            <ol>
                {links.map(el => (
                    <li>
                        From - <a href={el.from} target="_blank">{el.from}</a> <br/>
                        <button onClick={() => detailsHandler(el._id)}>
                            detail
                        </button>
                    </li>
                ))}
            </ol>
        </>

    )
}

export default LinksPage

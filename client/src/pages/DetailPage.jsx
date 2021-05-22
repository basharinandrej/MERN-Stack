import React, {useContext} from 'react'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/authContext";
import {useParams} from 'react-router-dom';

const DetailPage = () => {
    const {request} = useHttp()
    const {token} = useContext(AuthContext)
    const id = useParams().id
    const [data, setData] = React.useState({})

    React.useEffect(async () => {
        try {
            const data = await request(
                `/api/link/${id}`,
                'GET', null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            setData(data)
        } catch (e) {
            console.log('e', e);
        }
    }, [])

    return (
        <>
            <h1>
                DetailPage
            </h1>
            To - <a href={data.to} target="_blank">{data.to}</a> <br/>
            From - <a href={data.from} target="_blank">{data.from}</a> <br/>


            Cnt Click = {data.clicks} <br/><br/>
        </>

    )
}

export default DetailPage

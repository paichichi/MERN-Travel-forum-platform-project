import React, { useEffect, useState } from 'react';
import styles from './msg.module.css';
import PieceOfMsg from './pieceOfMsg';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Msg = ({token}) => {

    const { id } = useParams();
    const [msg, setMsg] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/user/msg?userid=${id}`, { headers: { Authorization: token } })
            .then(res => {
                let data = res.data.msg;
                data = data.sort((a, b) => a.time_sent > b.time_sent ? -1 : 1)
                setMsg(data);
            })

    }, [id])

    async function markAsRead(msgid) {
        
        await axios.put(`http://localhost:8080/user/msg/${msgid}`,{}, { headers: { Authorization: token } });

        await axios.get(`http://localhost:8080/user/msg?userid=${id}`, { headers: { Authorization: token } })
            .then(res => {
                let data = res.data.msg;
                data = data.sort((a, b) => a.time_sent > b.time_sent ? -1 : 1)
                setMsg(data);
            })
    };
    return (
        <div>
            {msg.length === 0 && <h2>You haven't received a message</h2>}
            {msg.length !== 0 && 
            <div className={styles.titlediv}>
                <h2>My message</h2>
            </div>}
            {msg.map((each) => {
                return (
                    <PieceOfMsg
                        key={each.msgID}
                        each={each}
                        markAsRead={markAsRead}
                        token={token}
                         />)

            })}
        </div>
    )
}
export default Msg;
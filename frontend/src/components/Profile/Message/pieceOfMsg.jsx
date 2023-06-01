import React, { useEffect, useState } from 'react';
import styles from './pieceOfMsg.module.css';
import axios from 'axios';

const PieceOfMsg = ({ each, markAsRead, token }) => {


    const { _id, msgID, content, senderID, receiverID, isRead, time_sent } = each;
    const [date, setDate] = useState('');
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const [sender, setSender] = useState('');



    async function reply() {
        if(replyContent.trim().length===0){
            alert("reply content cannot be empty!");
            return;
        }
        await axios.post(`http://localhost:8080/user/msg`, { senderid: receiverID, receiverid: senderID, content: replyContent },{ headers: { Authorization: token } })
        setReplyContent(`Reply @${sender} '${content.length >= 20 ? (content.substring(0, 18) + "...") : content}': `)
        markAsRead(msgID)
        setReplying(false)
    }

    function cancelReply() {
        setReplyContent(`Reply @${sender} '${content.length >= 20 ? (content.substring(0, 18) + "...") : content}': `)
        setReplying(false)
    }

    useEffect(() => {
        setDate(new Date(time_sent * 1000).toLocaleString())
        axios.get(`http://localhost:8080/user?id=${senderID}`, { headers: { Authorization: token } })
            .then((res) => {
                setSender(res.data[0].userName)
                setReplyContent(`Reply @${sender} '${content.length >= 20 ? (content.substring(0, 18) + "...") : content}': `)
            }).catch(err => console.log(err));
    }, [time_sent, senderID, content, sender])



    return (
        <div className={`${styles.container} ${isRead ? null : styles.unread}`}>
            <div className={styles.upper}>
                <p className={styles.name}>By: @{sender}</p>
                <p className={styles.time}>{date}  {!isRead ? (<span className={styles.hint}>UnRead</span>) : null}</p>
            </div>
            <div className={styles.mid}>
                <p className={styles.content}>{content}</p>
            </div>
            <div className={styles.lower}>
                <button className={styles.replybtn} onClick={() => setReplying(!replying)}>{replying ? ("Replying") : "Reply"}</button>
                {!isRead ? (<button onClick={() => { markAsRead(msgID) }} className={styles.readbtn}>Read</button>) : null}
            </div>
            {replying ? (<div className={styles.REdiv}>
                <div className={styles.hintarea}><p>what's in your mind?</p></div>
                <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className={styles.REinput} />
                <div className={styles.btnarea}><button className={styles.extrabtn} onClick={reply}>Send</button><button className={styles.extrabtn} onClick={cancelReply}>Cancel</button></div>
            </div>) : null}

        </div>
    )

};

export default PieceOfMsg;
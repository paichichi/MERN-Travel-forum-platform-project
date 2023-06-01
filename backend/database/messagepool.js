import { getmsgDB } from "./database.js"
import { Int32 } from 'mongodb';


export async function createMsg(senderID, receiverID, content) {

    const count = await getmsgDB().find().toArray()

    const new_msg = {
        msgID: new Int32(count.length+1),
        content: content,
        senderID: new Int32(senderID),
        receiverID: new Int32(receiverID),
        isRead: false,
        time_sent: new Int32(Math.floor(new Date().getTime() / 1000))

    };

    await getmsgDB().insertOne(new_msg);

};

export async function get_msg_by_receiver(receiverID) {

    const messages = await getmsgDB().find({ receiverID: new Int32(receiverID) }).toArray();
    return messages;
};

export async function delete_message(msgID) {

    await getmsgDB().deleteOne({ msgID: new Int32(msgID) });

};

export async function mark_as_read(msgID) {

    await getmsgDB().updateOne(
        { msgID: new Int32(msgID) },
        {
            $set: {
                isRead: true
            }
        }
    );
};
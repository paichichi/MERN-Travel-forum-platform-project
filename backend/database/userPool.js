import { Int32 } from 'mongodb';
import { getusersDB } from './database.js';
import md5 from 'js-md5';
import { config } from '../config/config.js';


export async function get_all_user() {

    const users = await getusersDB().find({}).toArray()
    return users

};

export async function get_user_by_id(userID) {

    const id = new Int32(userID);

    const user = await getusersDB().find({ id: id }).toArray();

    return user;

};

export async function get_user_by_name(username) {

    const user = await getusersDB().find({ userName: username }).toArray();
    return user;
};

export async function get_user_info(userID) {

    const id = new Int32(userID);
    const user = await getusersDB().find({ id: id }).toArray();
    if (user.length != 0) {
        return {
            id: user[0].id,
            fullname: user[0].fullName,
            email: user[0].email,
            mobile: user[0].mobile,
            phone: user[0].phone,
            address: user[0].address,
            web: user[0].web,
            fb: user[0].FB,
            twit: user[0].twit,
            ins: user[0].ins,
            li: user[0].li
        }
    } else {
        return []
    }

};

export async function update_user_info(userid, new_info) {
    const id = new Int32(userid);
    await getusersDB().updateOne(
        { id: id },
        {
            $set: {
                fullName: new_info.fullName,
                email: new_info.email,
                mobile: new_info.mobile,
                phone: new_info.phone,
                address: new_info.address,
                web: new_info.web,
                FB: new_info.FB,
                twit: new_info.twit,
                ins: new_info.ins,
                li: new_info.li,
            }
        }
    );
    const user = await getusersDB().find({ id: id }).toArray();
    return user[0];
};

export async function create_user(username, pwd) {

    const count = await getusersDB().find().toArray();
    const new_id = count.length+1

    const newUser = {
        id: new Int32(new_id),
        userName: username,
        password: md5(md5(config.md5.secret+pwd)),
        fullName: "",
        email: "",
        mobile: "",
        phone: "",
        address: "",
        web: "",
        FB: "",
        twit: "",
        ins: "",
        li: ""
    };

    await getusersDB().insertOne(newUser);

    return await getusersDB().find({ id: new Int32(new_id) }).toArray();
};

export async function change_pwd(userid, pwd) {

    await getusersDB().updateOne(
        { id: new Int32(userid) },
        { $set: { password: md5(md5(config.md5.secret+pwd)) } }
    );
};

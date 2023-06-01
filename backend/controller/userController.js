import * as userPool from '../database/userPool.js';
import * as msgPool from '../database/messagepool.js';
import * as followPool from '../database/followpool.js';
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import md5 from 'js-md5';

export const user_get_req = async function (req, res) {
  const id = req.query.id;
  const name = req.query.username;

  if (!name && !id) {
    const user = await userPool.get_all_user();
    res.status(200).json(user);
  } else if (!name) {
    const user = await userPool.get_user_by_id(id);
    res.status(200).json(user);
  } else if (!id) {
    const user = await userPool.get_user_by_name(name);
    res.status(200).json(user);
  }
};

export const info_get_req = async function (req, res) {
  const id = req.params.id;

  const user_info = await userPool.get_user_info(id);
  res.status(200).json(user_info);
};

export const info_put_req = async function (req, res) {

  jwt.verify(req.headers.authorization, config.jwt.encoding, async (err, authorizedData) => {
    if (err) {
      console.log(err)
      res.status(401).json("Authentication error.")
    } else {
      const new_info = req.body.new_info;
      await userPool.update_user_info(req.params.id, new_info);
      res.status(201).json('success');
    }
  })

};

export const pwdchange = async function (req, res) {

  jwt.verify(req.headers.authorization, config.jwt.encoding, async (err, authorizedData) => {
    if (err) {
      res.status(401).json("Authentication error.")
    } else {
      const current = req.body.currentPassword;
      const new_pwd = req.body.newPassword;
      const confirmpwd = req.body.confirmNewPassword;
      const id = req.body.userid;
      let user = await userPool.get_user_by_id(id);
      user = user[0];
      if (md5(md5(config.md5.secret + current)) != user.password) {
        res.status(403).json({ msg: 'current password wrong' });
      } else if (new_pwd == ' ' || new_pwd == '') {
        res.status(403).json({ msg: 'password cannot be empty' });
      } else if (md5(md5(config.md5.secret + new_pwd)) == user.password) {
        res.status(403).json({ msg: 'new password cannot be same as old' });
      } else if (new_pwd != confirmpwd) {
        res.status(403).json({ msg: 'confirm password does not match' });
      } else {
        await userPool.change_pwd(id, new_pwd);
        res.status(200).json({ msg: "you've changed your password" });
      }
    }
  })
};

export const sign_up_req = async function (req, res) {
  const uname = req.body.username;
  const pwd = req.body.password;
  const cpwd = req.body.confirmPassword;
  const exist = await userPool.get_user_by_name(uname);
  if (exist && exist.length != 0) {
    res.status(403).json({ msg: 'user already exist' });
  } else if (pwd != cpwd) {
    res.status(403).json({ msg: 'confirm password must match password' });
  } else if (pwd == ' ' || pwd == '') {
    res.status(403).json({ msg: 'password cannot be empty' });
  } else if (uname == '' || uname == ' ') {
    res.status(403).json({ msg: 'username cannot be empty' });
  } else {
    let user = await userPool.create_user(uname, pwd);
    user = {
      id: user[0].id,
      username: user[0].userName,
    };
    const payload = user;
    let token = jwt.sign(payload, config.jwt.encoding, { expiresIn: '2days' });

    res.status(201).json({
      msg: "you've successfully signed up!",
      token: token,
      user: user,
    });
  }
};

export const login_req = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const exist = await userPool.get_user_by_name(username);
  if (!exist || exist.length == 0) {
    res.status(403).json({ msg: 'login credential error' });
  } else if (md5(md5(config.md5.secret + password)) != exist[0].password) {
    res.status(403).json({ msg: 'login credential error' });
  } else {
    let user = {
      id: exist[0].id,
      username: exist[0].userName,
    };
    const payload = user
    let token = jwt.sign(payload, config.jwt.encoding, { expiresIn: '2days' });
    res.status(200).json({ token: token, user: user });
  }
};

export const msg_get_req = async function (req, res) {

  jwt.verify(req.headers.authorization, config.jwt.encoding, async (err, authorizedData) => {
    if (err) {
      res.status(401).json("Authentication error.")
    } else {
      const id = req.query.userid;
      const msg = await msgPool.get_msg_by_receiver(id);
      res.status(200).json({ msg: msg });
    }
  })

};

export const msg_put_req = async function (req, res) {
  jwt.verify(req.headers.authorization, config.jwt.encoding, async (err, authorizedData) => {
    if (err) {
      res.status(401).json("Authentication error.")
    } else {
      const id = req.params.id;
      await msgPool.mark_as_read(id);
      res.status(200).json('marked');
    }
  })
}

export const msg_post_req = async function (req, res) {

  jwt.verify(req.headers.authorization, config.jwt.encoding, async (err, authorizedData) => {
    if (err) {
      res.status(401).json("Authentication error.")
    } else {
      const senderID = req.body.senderid;
      const receiverID = req.body.receiverid;
      const content = req.body.content;

      await msgPool.createMsg(senderID, receiverID, content);
      res.status(201).json('success');
    }
  })
};

export const follow_get_req = async function (req, res) {
  const fid = req.query.fID;
  const bf = req.query.bfID;
  if (!bf) {
    const list = [];
    const number = await followPool.getTotalFollows(fid);

    for (const item of number) {
      const one = await userPool.get_user_by_id(item.beFollowed);
      const name = one[0].userName;
      const temp = { name: name, id: item.beFollowed };
      list.push(temp);
    }
    res.status(200).json(list);
  } else {
    const exist = await followPool.getFollow(fid, bf);
    res.status(200).json(exist);
  }
};

export const follow_post_req = async function (req, res) {
  const follower = req.body.fID;
  const fb = req.body.fbID;
  await followPool.createFollow(follower, fb);
  res.status(201).send({ message: 'followed' });
};

export const follow_delete_req = async function (req, res) {
  const follower = req.query.followerid;
  const fb = req.query.fbID;
  await followPool.cancel_follow(follower, fb);
  res.status(200).send({ message: 'follow cancelled' });
};

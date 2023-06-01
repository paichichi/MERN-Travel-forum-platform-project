import { getfollowDB } from "./database.js"
import { Int32 } from 'mongodb';


export async function createFollow(fID, bfID) {

    await getfollowDB().insertOne(
        {
            followerID: new Int32(fID),
            beFollowed: new Int32(bfID)
        }
    );
};

export async function cancel_follow(fID, bfID) {

    await getfollowDB().deleteOne(
        {
            followerID: new Int32(fID),
            beFollowed: new Int32(bfID)
        }
    );
};

export async function getTotalFollows(fID) {

    const follows = await getfollowDB().find({ followerID: new Int32(fID) }).toArray();
    return follows;

};

export async function getFollow(fid, bfid) {
    const follow = await getfollowDB().find({ followerID: new Int32(fid), beFollowed: new Int32(bfid) }).toArray();
    if (follow && follow.length != 0) {
        return true;
    } else return false

}
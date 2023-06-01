import { ObjectId } from 'mongodb';
import { getCommentsCollection } from './database.js';
import * as postRepository from './postRepository.js';
import { addIdField } from './dbHelper.js';

export async function getAllComments() {
  const comments = await getCommentsCollection().find().toArray();
  return comments.map(addIdField);
}

export async function getCommentsByPost(postId) {
  const comments = await getCommentsCollection().find({ postId }).toArray();
  return comments.map(addIdField);
}

export async function getCommentsByUsername(username) {
  const comments = await getCommentsCollection().find({ username }).toArray();
  return comments.map(addIdField);
}

export async function getCommentsByPostAndUsername(postId, username) {
  const comments = await getCommentsCollection()
    .find({ postId, username })
    .toArray();
  return comments.map(addIdField);
}

export async function getCommentByID(id) {
  const comment = await getCommentsCollection().findOne({
    _id: new ObjectId(id),
  });
  return addIdField(comment);
}

export async function createComment(postId, username, content) {
  const comment = {
    createdAt: new Date(),
    postId,
    username,
    content,
  };

  const created = await getCommentsCollection().insertOne(comment);
  await postRepository.pushCommentIdToPost(
    postId,
    created.insertedId.toString()
  );
  return addIdField({ ...comment, _id: created.insertedId });
}

export async function updateComment(id, content) {
  const updated = await getCommentsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        content: content ? content : '',
      },
    },
    { returnDocument: 'after' }
  );
  return addIdField({ ...updated.value, _id: id });
}

export async function removeComment(commentId, postId) {
  await getCommentsCollection().deleteOne({ _id: new ObjectId(commentId) });
  await postRepository.popCommentIdFromPost(postId, commentId);
}

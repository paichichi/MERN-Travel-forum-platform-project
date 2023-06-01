import { ObjectId } from 'mongodb';
import { getCommentsCollection, getPostsCollection } from './database.js';
import { addIdField } from './dbHelper.js';

export const getAllPosts = async () => {
  const posts = await getPostsCollection().find().toArray();
  return posts.map(addIdField);
};

export const getPostsByUsername = async (username) => {
  const posts = await getPostsCollection().find({ username }).toArray();
  return posts.map(addIdField);
};

export const getPostsByLocation = async (location) => {
  const posts = await getPostsCollection().find({ location }).toArray();
  return posts.map(addIdField);
};

export const getPostsByUsernameAndLocation = async (username, location) => {
  const posts = await getPostsCollection()
    .find({ username, location })
    .toArray();
  return posts.map(addIdField);
};

export const getPostById = async (id) => {
  const post = await getPostsCollection().findOne({ _id: new ObjectId(id) });
  return addIdField(post);
};

export const createPost = async (username, location, content, imageUrl) => {
  const post = {
    createdAt: new Date(),
    username,
    location,
    content,
    likes: 0,
    imageUrl: imageUrl ? imageUrl : '',
    commentIds: [],
  };
  const created = await getPostsCollection().insertOne(post);
  return addIdField({ ...post, _id: created.insertedId });
};

export async function updatePost(id, updateInfo) {
  const { content, likes } = updateInfo;
  const updated = await getPostsCollection().findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...(content !== null && { content }),
        ...(likes !== null && { likes }),
      },
    },
    { returnDocument: 'after' }
  );
  return addIdField({ ...updated.value, _id: id });
}

export async function removePost(id) {
  await getPostsCollection().deleteOne({ _id: new ObjectId(id) });
  await getCommentsCollection().deleteMany({ postId: id });
}

export async function pushCommentIdToPost(postId, commentId) {
  const post = await getPostById(postId);
  const updated = await getPostsCollection().findOneAndUpdate(
    { _id: new ObjectId(postId) },
    {
      $set: {
        commentIds: [...post.commentIds, commentId],
      },
    },
    { returnDocument: 'after' }
  );
  return addIdField({ ...updated.value, _id: postId });
}

export async function popCommentIdFromPost(postId, commentId) {
  const post = await getPostById(postId);
  const updatedCommentIDs = post.commentIds.filter((id) => id !== commentId);
  const updated = await getPostsCollection().findOneAndUpdate(
    { _id: new ObjectId(postId) },
    {
      $set: {
        commentIds: updatedCommentIDs,
      },
    },
    { returnDocument: 'after' }
  );
  return addIdField({ ...updated.value, _id: postId });
}

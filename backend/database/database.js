import { MongoClient } from 'mongodb';
import { config } from '../config/config.js';

let db;

export async function connectDB() {
  const client = new MongoClient(config.db.host);
  db = client.db();
  // return the db in case outside repositories call this function
  return db;
}

export function getPostsCollection() {
  return db.collection('posts');
}

export function getCommentsCollection() {
  return db.collection('comments');
}

export function getusersDB() {
  return db.collection('users');
}

export function getmsgDB() {
  return db.collection('msg');
}

export function getfollowDB() {
  return db.collection('follow');
}
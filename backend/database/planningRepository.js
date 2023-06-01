import { connectDB } from './database.js';

export async function createPlan(plan) {
  const db = await connectDB();
  const result = await db.collection('plans').insertOne(plan);
  return result;
}

export async function getPlans() {
  const db = await connectDB();
  const result = await db.collection('plans').find({}).toArray();
  return result;
}

export async function getPlansByUser(userID) {
  console.log(userID);
  const db = await connectDB();
  const result = await db
    .collection('plans')
    .find({ userID: userID })
    .toArray();
  return result;
}

export async function getPlanByID(planID) {
  const db = await connectDB();
  const result = await db.collection('plans').findOne({ planID: planID });
  return result;
}

export async function updatePlan(planID, updates) {
  const db = await connectDB();
  const result = await db
    .collection('plans')
    .updateOne({ planID: planID }, { $set: updates });
  return result;
}

export async function deletePlan(planID) {
  const db = await connectDB();
  const result = await db
    .collection('plans')
    .deleteOne({ _id: planID });
  return result;
}

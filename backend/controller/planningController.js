import * as planningRepository from '../database/planningRepository.js';

export const createPlan = async (req, res, next) => {
  const plan = req.body;
  try {
    const result = await planningRepository.createPlan(plan);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const getPlans = async (req, res, next) => {
  const uid = parseInt(req.query.uid);
  const pid = req.query.pid;

  let data;
  if (!uid) {
    // or uid not found, but this should be good as uid would be in local storage if logged in
    res.status(401).json('Unauthorised');
  } else if (!pid) {
    data = await planningRepository.getPlansByUser(uid);
  } else {
    data = await planningRepository.getPlanByID(pid);
  }
  res.status(200).json(data);
};

export const updatePlan = async (req, res, next) => {
  const planID = parseInt(req.params.planID);
  const updates = req.body;
  try {
    const result = await planningRepository.updatePlan(planID, updates);
    if (result.matchedCount === 1) {
      res.status(200).send(`Plan with ID ${planID} updated successfully`);
    } else {
      res.status(404).send(`Plan with ID ${planID} not found`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

export const deletePlan = async (req, res, next) => {
  const planID = req.params.planID;
  try {
    const result = await planningRepository.deletePlan(planID);
    if (result.deletedCount === 1) {
      res.status(200).send(`Plan with ID ${planID} deleted successfully`);
    } else {
      res.status(404).send(`Plan with ID ${planID} not found`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

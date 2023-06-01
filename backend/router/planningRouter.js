import express from 'express';
import 'express-async-errors';
import * as planningController from '../controller/planningController.js';

export const planningRoute = express.Router();

// GET all plans
planningRoute.get('/', planningController.getPlans);

// GET a single plan by ID
// planningRoute.get('/:planID', planningController.getPlan);

// POST a new plan
planningRoute.post('/', planningController.createPlan);

// PUT/update an existing plan by ID
planningRoute.put('/:planID', planningController.updatePlan);

// DELETE a plan by ID
planningRoute.delete('/:planID', planningController.deletePlan);


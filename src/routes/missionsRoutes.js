import express from 'express';
import missionsController from '../controllers/misssionsController.js';

const router = express.Router();

router
    .get("/missions", missionsController.listMissions)
    .get("/missions/:id", missionsController.listMissionsById)
    .post("/missions", missionsController.registerMission)
    .put("/missions/:id", missionsController.updateMission)
    .delete("/missions/:id", missionsController.deleteMission)

export default router;
import express from 'express';
import historicalController from '../controllers/historicalController.js';

const router = express.Router();

router
    .get('/historical', historicalController.listHistorical)
    .get('/historical/:id', historicalController.listHistoricalById)
    .post('/historical', historicalController.registerHistorical)
    .put('/historical/:id', historicalController.updateHistorical)
    .delete('/historical/:id', historicalController.deleteHistorial)

export default router;

import { Router } from 'express';
import { getChatResponse } from '../lib/store.js';

const chatRouter = Router();

chatRouter.post('/respond', async (request, response, next) => {
  try {
    const { message } = request.body || {};
    const payload = getChatResponse(message);

    response.json({
      ...payload,
      message,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

chatRouter.get('/suggestions', (request, response) => {
  response.json({
    suggestions: [
      'Optimize payroll',
      'Analyze yield performance',
      'Show employee stats',
      'Calculate ROI',
      'Compare departments',
    ],
  });
});

export default chatRouter;

import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (request, response) => {
  response.json({
    ok: true,
    service: 'derp-backend',
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;

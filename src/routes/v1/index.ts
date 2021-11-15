import { Router } from 'express';
import endpoints from '@src/routes/v1/endpoint';

const router = Router();

// eslint-disable-next-line array-callback-return
endpoints.map(({ path, handler, method }) => {
  switch (method) {
    case 'GET':
      router.get(path, handler);
      break;
    case 'POST':
      router.post(path, handler);
      break;
    case 'PUT':
      router.put(path, handler);
      break;
    case 'PATCH':
      router.patch(path, handler);
      break;
    case 'DELETE':
      router.delete(path, handler);
      break;
    default:
      break;
  }
});

export default router;

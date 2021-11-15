import { Request, Response } from 'express';
import { getTest, postTest } from '@src/controllers';

interface IHandler {
  // eslint-disable-next-line no-unused-vars
  (req: Request, res: Response): void;
}

interface IRoutes {
  path: string;
  method: string;
  handler: IHandler;
}

const GET_ROUTES: Array<IRoutes> = [
  {
    path: '/test',
    method: 'GET',
    handler: getTest,
  },
];

const POST_ROUTES: Array<IRoutes> = [
  {
    path: '/test',
    method: 'POST',
    handler: postTest,
  },
];

export default [...GET_ROUTES, ...POST_ROUTES];

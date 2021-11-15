import { Request, Response } from 'express';

export const getTest = (req: Request, res: Response) => {
  res.send('get test');
};

export const postTest = (req: Request, res: Response) => {
  res.send('post test');
};

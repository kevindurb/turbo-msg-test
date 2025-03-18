import { Router } from 'express';

export const controller = Router();

controller.get('/', (_, res) => res.redirect('/messages'));

import express from 'express';
import { controller as messagesController } from './controllers/messages-controller.ts';
import { controller as indexController } from './controllers/index-controller.ts';
import bodyParser from 'body-parser';

export const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', indexController);
app.use('/messages', messagesController);

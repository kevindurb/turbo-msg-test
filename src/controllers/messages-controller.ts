import { Router } from 'express';

const messages: string[] = [];

export const controller = Router();

controller.get('/', (_, res) => {
	res.render('messages/list', { messages });
});

controller.post('/', (req, res) => {
	const message = req.body.message;
	if (typeof message !== 'string' || !message.length) {
		return res.render('messages/list', { messages });
	}

	messages.push(message);

	res.render('messages/list', { messages });
});

import { Router } from 'express';
import { Message } from '../models/message.ts';
import { MessageRepository } from '../repositories/message-repository.ts';
import { TurboStream } from '../turbo-stream.ts';

const messageRepository = new MessageRepository();
export const controller = Router();

controller.get('/', async (_, res) => {
	res.render('messages/list', { messages: await messageRepository.list() });
});

controller.post('/', async (req, res) => {
	const text = req.body.message;
	if (typeof text !== 'string' || !text.length) {
		return res.redirect('/messages');
	}

	const message = new Message({ text });
	await messageRepository.save(message);
	TurboStream.getInstance().append(res, 'messages', 'messages/item', {
		message,
	});

	return res.redirect('/messages');
});

import { Router } from 'express';
import { Message } from '../models/message.ts';
import { MessageRepository } from '../repositories/message-repository.ts';
import { TurboStream } from '../turbo-stream.ts';
import { z } from 'zod';
import { TURBO_STREAM } from '../utils/accepts.ts';

const messageRepository = new MessageRepository();
export const controller = Router();

const CreateMessageBody = z.object({
	text: z.string().nonempty(),
});

controller.get('/', async (_, res) => {
	res.render('messages/list', { messages: await messageRepository.list() });
});

controller.post('/', async (req, res) => {
	const { data: body, error } = CreateMessageBody.safeParse(req.body);
	if (error) return res.redirect('/messages');
	const message = new Message({ text: body.text });
	await messageRepository.save(message);
	if (req.accepts(TURBO_STREAM)) {
		TurboStream.append(res, 'messages', 'messages/item', {
			message,
		});
	} else {
		res.redirect('/messages');
	}
});

import { Message, type MessageInterface } from '../models/message.ts';
import { db } from '../db.ts';

export class MessageRepository {
	private table() {
		return db<MessageInterface>('messages');
	}

	public async save(message: Message) {
		return await this.table().insert(message).onConflict('id').merge(message);
	}

	public async list() {
		return (await this.table().select()).map(Message.from);
	}
}

import { randomUUID } from 'node:crypto';

export interface MessageInterface {
	id: string;
	text: string;
}

export class Message implements MessageInterface {
	public id = randomUUID();
	public text = '';

	public constructor(values?: Partial<MessageInterface>) {
		Object.assign(this, values);
	}

	public static from(values: Partial<MessageInterface>) {
		return new Message(values);
	}
}

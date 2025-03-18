import { type Response } from 'express';
import { type Server } from 'node:http';
import { WebSocket, WebSocketServer } from 'ws';

export class TurboStream {
	private wss: WebSocketServer;
	private connections = new Set<WebSocket>();
	private static instance: TurboStream | undefined;

	private constructor(server: Server) {
		this.wss = new WebSocketServer({ server });
		this.wss.on('connection', this.handleConnection.bind(this));
	}

	public static attach(server: Server) {
		if (this.instance) throw new Error('TurboStream instance already attached');
		this.instance = new TurboStream(server);
	}

	public static getInstance() {
		if (!this.instance) throw new Error('TurboStream instance not attached');
		return this.instance;
	}

	private handleConnection(ws: WebSocket) {
		this.connections.add(ws);
		ws.on('close', () => this.connections.delete(ws));
	}

	private sendAll(message: string) {
		this.connections.forEach((ws) => ws.send(message));
	}

	public append(res: Response, target: string, view: string, locals?: object) {
		res.render(view, locals, (err, html) => {
			if (err) throw err;
			res.render(
				'turbo/stream',
				{ action: 'append', target, html },
				(err, streamHtml) => {
					if (err) throw err;
					this.sendAll(streamHtml);
				},
			);
		});
	}
}

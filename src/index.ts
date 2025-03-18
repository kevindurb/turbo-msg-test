import { app } from './app.ts';
import { TurboStream } from './turbo-stream.ts';

const server = app.listen(process.env['PORT'], () =>
	console.log('App started'),
);
TurboStream.attach(server);

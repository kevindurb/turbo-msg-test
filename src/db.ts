import knex from 'knex';
import humps from 'humps';

export const db = knex({
	client: 'better-sqlite3',
	connection: {
		filename: 'database.sqlite',
	},
	useNullAsDefault: true,
	postProcessResponse: (result) => humps.camelizeKeys(result),
	wrapIdentifier: (value, origImpl) => origImpl(humps.decamelize(value)),
});

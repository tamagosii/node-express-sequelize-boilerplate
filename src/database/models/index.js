import Sequelize from 'sequelize';
import config from '../../config/sequelize';
import fs from 'fs';
import path from 'path';

const { database, dialect, host, logging, password, port, username } = config;

const sequelize = new Sequelize(database, username, password, {
	dialect,
	host,
	logging,
	port,
});

const db = {};
fs.readdirSync(__dirname)
	.filter((files) => files !== `index.js` && files !== 'append-auditrai.js')
	.forEach((file) => {
		const model = sequelize.import(path.join(`${__dirname}/${file}`));
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

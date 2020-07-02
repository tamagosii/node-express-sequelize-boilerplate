import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import parser from 'body-parser';
import db from './database/models';
require('express-group-routes');

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use(cors());

dotenv.config();
require(`./routes`)(app);

db.sequelize.sync({ force: true }).then(() => {
	if (process.env.NODE_ENV !== 'test') {
		const server = app.listen(
			process.env.NODE_PORT ? process.env.NODE_PORT : 8083
		);

		server.timeout = 0;
	}
});

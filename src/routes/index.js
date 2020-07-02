import fs from 'fs';
import path from 'path';

module.exports = (app) => {
	fs.readdirSync(__dirname)
		.filter((file) => file !== 'index.js')
		.forEach((file) => {
			require(path.join(`${__dirname}/${file}`))(app);
		});
};

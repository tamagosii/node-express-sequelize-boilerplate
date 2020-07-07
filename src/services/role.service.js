import AdapterService from './adapter.service';
import models from '../database/models';

export default class RoleService extends AdapterService {
	async create(payload) {
		try {
			const data = await super.create(models.role, payload);
			return data;
		} catch (error) {
			console.error(error);
			throw Error();
		}
	}

	async deleteByID({ id }) {
		const transaction = models.sequelize.transaction();
		try {
			const data = await super.deleteByID(models.role, id, {
				transaction,
			});

			await transaction.commit();
			return data;
		} catch (error) {
			transaction.rollback();
			console.error(error);
			throw Error();
		}
	}
}

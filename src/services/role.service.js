import AdapterService from './adapter.service';
import models from '../database/models';

export default class RoleService extends AdapterService {
	async create(res, payload, options = {}) {
		try {
			const data = await super.create(models.role, payload, options);
			return data;
		} catch (error) {
			res.status(500).send(AdapterService.generateHTTPStatus(500));
		}
	}
}

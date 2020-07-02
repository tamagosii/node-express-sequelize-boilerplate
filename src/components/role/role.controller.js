import AdapterService from '../../services/role.service';
import RoleService from '../../services/role.service';
const roleService = new RoleService();

const create = async (req, res) => {
	try {
		const { name } = req.body;
		const data = await roleService.create(res, { name });

		res.status(201).send(AdapterService.generateHTTPStatus(201, data));
	} catch (error) {
		res.status(500).send(AdapterService.generateHTTPStatus(500));
	}
};

export default {
	create,
};

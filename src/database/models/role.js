import AdapterService from '../../services/adapter.service';

export default (sequelize, DataTypes) => {
	const Role = sequelize.define(
		'role',
		AdapterService.appendAuditrailAndID(DataTypes, {
			name: DataTypes.STRING,
		})
	);

	return Role;
};

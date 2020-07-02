import AdapterService from '../../services/adapter.service';

export default (sequelize, DataTypes) => {
	const User = sequelize.define(
		'user',
		AdapterService.appendAuditrailAndID(DataTypes, {
			email: {
				type: DataTypes.STRING,
				unique: true,
			},
			password: DataTypes.STRING,
			token: DataTypes.STRING,
			expired: DataTypes.DATE,
			roleID: {
				field: 'role_id',
				type: DataTypes.INTEGER,
			},
		})
	);

	User.associate = (models) => {
		User.belongsTo(models.role, {
			as: 'roles',
			foreignKey: 'role_id',
		});
	};

	return User;
};

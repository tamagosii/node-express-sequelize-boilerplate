import RoleComponent from '../components/role';

module.exports = (app) => {
	app.group('/api/v1', (router) => {
		router.group('/role', (route) => {
			route.post(`/`, RoleComponent.controller.create);
		});
	});
};

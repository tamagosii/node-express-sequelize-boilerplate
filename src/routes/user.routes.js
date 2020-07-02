import UserComponent from '../components/user';

module.exports = (app) => {
	app.group('/api/v1', (router) => {
		router.group('/user', (route) => {
			route.get(`/`, UserComponent.controller.testUser);
		});
	});
};

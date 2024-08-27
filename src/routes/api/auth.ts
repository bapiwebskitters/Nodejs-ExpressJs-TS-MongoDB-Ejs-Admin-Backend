// API Authentication
router.post('/api/login', namedRoutes('api.login'), loginController.apiLogin);
router.post('/api/signup', namedRoutes('api.signup'), signupController.apiSignup);
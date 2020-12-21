const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve);

router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.post('/admin/register', userController.allowIfLoggedIn, userController.grantAccess('createAny', 'profile'), userController.register);

router.post('/login', userController.login);

router.get('/user/:username', userController.allowIfLoggedIn, userController.getUser);

router.get('/user/', userController.allowIfLoggedIn, userController.grantAccess('readOwn', 'profile'), userController.getMyData);

router.get('/admin/user/:username', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUserAdmin);

router.get('/admin/users', userController.allowIfLoggedIn, userController.grantAccess('readAny', 'profile'), userController.getUsers);

router.put('/admin/user/:username', userController.allowIfLoggedIn, userController.grantAccess('updateAny', 'profile'), userController.updateUser);

router.delete('/admin/user/:username', userController.allowIfLoggedIn, userController.grantAccess('deleteAny', 'profile'), userController.deleteUser);

module.exports = router;
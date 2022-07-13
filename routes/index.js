const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger-output.json');


/**GET /user/login
GET /user/logout
DELETE /user/{username}
 */
var options = {
    explorer: true
};

router.use('/user', require('./user'));
router.use('/auth', require('./authentication').routes);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

module.exports = router;
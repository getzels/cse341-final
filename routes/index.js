const express = require('express');
const router = express.Router();


/**GET /user/login
GET /user/logout
DELETE /user/{username}
 */

router.use('/user', require('./user'));

module.exports = router;
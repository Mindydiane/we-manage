const express = require('express');
const router = express.Router();

router.use(require('./deptRoutes.js'));
router.use(require('./empRoutes.js'));
router.use(require('./roleRoutes.js'));

module.exports = router;
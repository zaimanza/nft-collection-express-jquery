var router = require('express').Router();

// split up route handling
router.use('/', require('./user_login.controller'));
router.use('/', require('./setup_collection.controller'));
router.use('/', require('./user_logout.controller'));
router.use('/', require('./add_metadata.controller'));
router.use('/', require('./get_metadata.controller'));

module.exports = router;
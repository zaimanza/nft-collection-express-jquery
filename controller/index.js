var router = require('express').Router();

// split up route handling
router.use('/', require('./user_login.controller'));
router.use('/', require('./setup_collection.controller'));
router.use('/', require('./user_logout.controller'));
// router.use('/addMetadata', require('./AddMetadataPage'));
// etc.

module.exports = router;
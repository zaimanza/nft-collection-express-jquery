var router = require('express').Router();

// split up route handling
router.use('/', require('./user_login.controller'));
// router.use('/home', require('./HomePage'));
// router.use('/addMetadata', require('./AddMetadataPage'));
// etc.

module.exports = router;
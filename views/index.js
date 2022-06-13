var router = require('express').Router();

// split up route handling
router.use('/login', require('./LoginPage'));
router.use('/setup_collection', require('./SetupCollectionPage'));
router.use('/home', require('./HomePage'));
// router.use('/addMetadata', require('./AddMetadataPage'));
// etc.

module.exports = router;
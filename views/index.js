var router = require('express').Router();

router.use('/login', require('./LoginPage'));
router.use('/setup_collection', require('./SetupCollectionPage'));
router.use('/home', require('./HomePage'));
router.use('/add_metadata', require('./AddMetadataPage'));

module.exports = router;
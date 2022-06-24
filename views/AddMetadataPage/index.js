var router = require('express').Router()

// api/products
router.get('/', async (req, res) => {
    res.render('AddMetadataPage/AddMetadataPage')
})

module.exports = router;



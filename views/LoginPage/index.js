var router = require('express').Router()
const { removeItem } = require('../../middleware/local_storage.middleware')

// api/products
router.get('/', async (req, res) => {
    removeItem({
        key: "player",
    })

    res.render('LoginPage/LoginPage', {
        mnemonic: "shield salad purse toss scale weasel dilemma hill gold attitude admit name",
    })
})

module.exports = router;

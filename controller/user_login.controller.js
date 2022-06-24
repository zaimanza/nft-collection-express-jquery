var router = require('express').Router()
const { getCollection } = require('../modules/collection.module')
const { getPlayer, player_login } = require('../modules/player.module')
// api/products
router.post('/user_login', async (req, res) => {
    try {
        const props = req.body;
        var register_result
        const player = await getPlayer()

        if (!player) {
            register_result = await player_login({
                mnemonic: props.mnemonic
            })
        }
        // chcek in db if collection tkda

        console.table(register_result)
        console.log(player)
        const fetchedCollection = await getCollection()
        if ((register_result || player) && fetchedCollection.length != 0) {

            res.status(200).json(register_result || player)
        } else {
            res.status(200).json("SetupCollectionPage")
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;



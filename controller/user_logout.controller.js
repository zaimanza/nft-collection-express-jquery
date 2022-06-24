var router = require('express').Router()
const { player_logout } = require('../modules/player.module')
// api/products
router.post('/user_logout', async (req, res) => {
    try {

        var register_result = await player_logout()
        // chcek in db if collection tkda

        if (register_result) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;



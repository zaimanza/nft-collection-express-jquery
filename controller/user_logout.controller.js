var router = require('express').Router()
const useLocalStorage = require('../modules/useLocalStorage')
const usePlayer = require('../modules/usePlayer')
const useCollection = require('../modules/useCollection')
const useMetadata = require('../modules/useMetadata')
const useBigchaindb = require('../modules/useBigchaindb')

const { removeItem } = useLocalStorage()
const { getCollection, createCollection } = useCollection()
const { getMetadatas, createMetadata } = useMetadata()
const { player_login, player_logout, player_register, getPlayer } = usePlayer()
const { fetchLatestTransaction } = useBigchaindb()
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



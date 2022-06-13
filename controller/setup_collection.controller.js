var router = require('express').Router()
const useLocalStorage = require('../modules/useLocalStorage')
const usePlayer = require('../modules/usePlayer')
const useCollection = require('../modules/useCollection')
const useMetadata = require('../modules/useMetadata')
const useBigchaindb = require('../modules/useBigchaindb')

const { removeItem } = useLocalStorage()
const { getCollection, createCollection } = useCollection()
const { getMetadatas, createMetadata } = useMetadata()
const { player_login, player_register, getPlayer } = usePlayer()
const { fetchLatestTransaction } = useBigchaindb()
// api/products
router.post('/setup_collection', async (req, res) => {
    try {
        const props = req.body;

        const player = await getPlayer()
        const returnData = await createCollection({
            asset: {
                type: "collection",
            },
            metadata: {
                title: props.title,
                description: props.description,
                image: props.image,
            },
            publicKey: player.publicKey,
            privateKey: player.privateKey
        })

        if (JSON.stringify(returnData) != JSON.stringify({})) {
            res.status(200).json(true)
        } else {
            res.status(200).json(false)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;



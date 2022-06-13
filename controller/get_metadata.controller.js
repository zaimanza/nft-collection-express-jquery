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
router.get('/get_metadata/:id', async (req, res) => {
    try {

        const assetId = req.params.id

        const latestFetchMeta = await fetchLatestTransaction(assetId)

        res.status(200).json({
            name: latestFetchMeta.metadata.name,
            description: latestFetchMeta.metadata.description,
            tokenId: latestFetchMeta.metadata.token_id,
            attributes: latestFetchMeta.metadata.attributes,
            image: latestFetchMeta.metadata.image,
            "current-chain": latestFetchMeta.metadata.current_chain
        })
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router;



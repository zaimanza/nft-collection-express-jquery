var router = require('express').Router()
const useBigchaindb = require('../modules/useBigchaindb')
const { fetchLatestTransaction } = useBigchaindb()

router.get('/get_metadata/:id?', async (req, res) => {
    try {
        const assetId = req.params?.id
        const latestFetchMeta = await fetchLatestTransaction(assetId)
        if (assetId) {
            res.status(200).json({
                name: latestFetchMeta.metadata.name,
                description: latestFetchMeta.metadata.description,
                tokenId: latestFetchMeta.metadata.token_id,
                attributes: latestFetchMeta.metadata.attributes,
                image: latestFetchMeta.metadata.image,
                "current-chain": latestFetchMeta.metadata.current_chain
            })
        } else {
            res.status(200).json({})
        }
    } catch (error) {
        res.status(400).json(error)
    }
})
module.exports = router;



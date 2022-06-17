var router = require('express').Router()
const useBigchaindb = require('../../modules/useBigchaindb')
const useCollection = require('../../modules/useCollection')
const useMetadata = require('../../modules/useMetadata')
const usePlayer = require('../../modules/usePlayer')

const { player_login, player_register, getPlayer } = usePlayer()
const { getCollection, createCollection } = useCollection()
const { getMetadatas, createMetadata } = useMetadata()
const { fetchLatestTransaction } = useBigchaindb()
// api/products
router.get('/', async (req, res) => {
    const fetchedCollection = await getCollection()
    const fetchedMetadatas = await getMetadatas()
    // chcek in db if collection tkda
    if (fetchedCollection) {
        const latestFetchTransaction = await fetchLatestTransaction(fetchedCollection.id)
        var latestFetchMetadatas = []
        if (fetchedMetadatas.length != 0) {
            for (const fetchedMetadata of fetchedMetadatas) {
                const latestFetchMeta = await fetchLatestTransaction(fetchedMetadata.id)
                // console.log(latestFetchMeta)
                latestFetchMetadatas.push(latestFetchMeta.metadata)
            }
        }
        await res.render('HomePage/HomePage',
            {
                collectionData: latestFetchTransaction.metadata,
                metadatas: latestFetchMetadatas,
            }
        )
    }
})
module.exports = router;

var router = require('express').Router()
const { fetchLatestTransaction } = require('../../database/bigchaindb.database')
const { getCollection } = require('../../modules/collection.module')
const { getMetadatas } = require('../../modules/metadata.module')
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
                console.log(latestFetchMeta)
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

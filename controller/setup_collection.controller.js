var router = require('express').Router()
const { createCollection } = require('../modules/collection.module')
const { getPlayer } = require('../modules/player.module')
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



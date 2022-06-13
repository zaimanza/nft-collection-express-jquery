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
router.post('/add_metadata', async (req, res) => {
    try {
        const props = req.body;

        const player = await getPlayer()
        const returnData = await createMetadata({
            asset: {
                type: "metadata",
            },
            metadata: {
                name: props.name,
                description: props.description,
                token_id: props.token_id,
                image: props.image,
                current_chain: props.current_chain,
                attributes: JSON.parse(props.attributes)
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



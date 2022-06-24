const bip39 = require('bip39')
const BigChainDB = require('bigchaindb-driver')
const { removeItem, getItem, setItem } = require('../middleware/local_storage.middleware')

exports.player_login = async ({ mnemonic }) => {

    const seed = (await bip39.mnemonicToSeed(mnemonic)).slice(0, 32)
    const player = new BigChainDB.Ed25519Keypair(seed)

    await setItem({
        key: "player",
        value: JSON.stringify(player)
    })

    return {
        mnemonic: mnemonic,
        private: player.privateKey,
        public: player.publicKey,
    };
}

exports.player_logout = async () => {


    await removeItem({
        key: "player"
    })

    return true;
}

exports.player_register = async () => {
    const mnemonic = bip39.generateMnemonic()

    const seed = (await bip39.mnemonicToSeed(mnemonic)).slice(0, 32)
    const player = new BigChainDB.Ed25519Keypair(seed)

    setItem({
        key: "player",
        value: JSON.stringify(player)
    })

    return {
        mnemonic: mnemonic,
        private: player.privateKey,
        public: player.publicKey,
    }
}

exports.getPlayer = async () => {
    try {
        return await JSON.parse(
            await getItem({
                key: "player"
            })
        )
    } catch (err) {
        return
    }
}

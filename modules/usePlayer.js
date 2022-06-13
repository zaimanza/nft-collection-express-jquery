const bip39 = require('bip39')
const BigChainDB = require('bigchaindb-driver')
const useLocalStorage = require('./useLocalStorage')

const usePlayer = () => {

    const { setItem, getItem } = useLocalStorage()

    const player_login = async ({ mnemonic }) => {

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
        };
    }

    const player_register = async () => {
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

    const getPlayer = async () => {
        return await JSON.parse(
            await getItem({
                key: "player"
            })
        )
    }

    return { player_login, player_register, getPlayer }
}

module.exports = usePlayer
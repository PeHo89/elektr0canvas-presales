from web3 import Web3

# todo configure provider
w3 = Web3(Web3.HTTPProvider(''))


def get_tx(tx_hash: str):
    return w3.eth.get_transaction(tx_hash)

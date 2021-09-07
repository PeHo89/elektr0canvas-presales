import os

from dotenv import load_dotenv
from web3 import Web3
from eth_utils import to_text

load_dotenv(dotenv_path=os.path.join(os.getcwd(), '..', '..', '.env'))

WEB3_HTTP_PROVIDER_URL = os.getenv('WEB3_HTTP_PROVIDER_URL')

w3 = Web3(Web3.HTTPProvider(WEB3_HTTP_PROVIDER_URL))


def get_tx_data_and_receiver(tx_hash: str):
    tx = w3.eth.get_transaction(tx_hash)
    data = tx.input
    receiver = tx.to
    return to_text(data), receiver

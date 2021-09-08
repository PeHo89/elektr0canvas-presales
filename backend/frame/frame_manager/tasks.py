import os

from dotenv import load_dotenv
from background_task import background
from .web3 import get_tx_data_and_receiver
from .models import Buyer

load_dotenv(dotenv_path=os.path.join(os.getcwd(), '..', '..', '.env'))

TO_ADDRESS = os.getenv('REACT_APP_TO_ADDRESS')
WEB3_TX_VERIFICATION_DELAY_S = int(os.getenv('WEB3_TX_VERIFICATION_DELAY_S'))
WEB3_TX_VERIFICATION_MAX_ATTEMPTS = int(os.getenv('WEB3_TX_VERIFICATION_MAX_ATTEMPTS'))


@background(schedule=WEB3_TX_VERIFICATION_DELAY_S)
def verify_tx(order_id, attempt):
    try:
        b = Buyer.objects.get(order_id=order_id)
    except Buyer.DoesNotExist:
        return

    order_id = str(b.order_id)
    tx_data_and_receiver = get_tx_data_and_receiver(b.tx_hash)

    if order_id == tx_data_and_receiver[0] and TO_ADDRESS == tx_data_and_receiver[1]:
        print(f'TX verification attempt #{attempt}: order {order_id} confirmed.')
        b.tx_confirmed = True
        b.save()
    elif attempt <= WEB3_TX_VERIFICATION_MAX_ATTEMPTS:
        print(f'TX verification attempt #{attempt}: order {order_id} not confirmed. Trying it another time.')
        verify_tx(order_id=order_id, attempt=attempt+1)
    else:
        print(f'TX verification attempt #{attempt}: order {order_id} not confirmed.')
        f = b.frame
        f.balance = f.balance + 1
        f.save()

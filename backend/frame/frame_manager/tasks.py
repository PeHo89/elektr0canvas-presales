from background_task import background
from .web3 import get_tx_data_and_receiver
from .models import Buyer

RECEIVER = ''


@background(schedule=30)
def verify_tx(order_id):
    try:
        b = Buyer.objects.get(order_id=order_id)
    except Buyer.DoesNotExist:
        return

    order_id = str(b.order_id)
    tx_data_and_receiver = get_tx_data_and_receiver(b.tx_hash)

    if order_id == tx_data_and_receiver[0] and RECEIVER == tx_data_and_receiver[1]:
        print(f'order {order_id} confirmed')
        b.tx_confirmed = True
        b.save()
    else:
        print(f'order {order_id} not confirmed')
        f = b.frame
        f.balance = f.balance + 1
        f.save()

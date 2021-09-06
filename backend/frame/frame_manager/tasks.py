from background_task import background
from .web3 import get_tx
from .models import Buyer


@background(schedule=60*10)
def verify_tx_hash(order_id):
    try:
        b = Buyer.objects.get(order_id=order_id)
    except Buyer.DoesNotExist:
        return

    order_id = b.order_id
    tx = get_tx(b.tx_hash)

    # todo verify if order_id is in tx data
    order_id_in_tx_data = True

    if order_id_in_tx_data:
        b.confirmed = True
        b.save()
    else:
        f = b.frame
        f.balance = f.balance + 1
        f.save()

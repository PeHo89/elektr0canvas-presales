from django.contrib import admin
from .models import *

@admin.register(Frame)
class FrameAdmin(admin.ModelAdmin):
    pass

@admin.register(Buyer)
class BuyerAdmin(admin.ModelAdmin):
    actions = ['download_csv']
    list_display = ('email', 'first_name', 'last_name', 'company', 'address1', 'address2', 'zip_code', 'city', 'country', 'phone', 'frame', 'order_date', 'order_id', 'tx_confirmed', 'tx_hash')
    def download_csv(self, request, queryset):
        import csv
        from django.http import HttpResponse
        from io import StringIO

        f = StringIO()
        writer = csv.writer(f)
        writer.writerow(['NO', 'Email', 'Name', 'Company', 'Address', 'Zip code', 'City', 'Country', 'Phone', 'Frame', 'Date', 'Order ID', 'TX Confirmed', 'TX Hash'])
        idx = 1
        for s in queryset:
            writer.writerow([
                idx,
                s.email,
                s.first_name + ' ' + s.last_name,
                s.company,
                s.address1 + ' ' + s.address2,
                s.zip_code,
                s.city,
                s.country,
                s.phone,
                s.frame,
                s.order_date,
                s.order_id,
                s.tx_confirmed,
                s.tx_hash,
            ])
            idx += 1

        f.seek(0)
        response = HttpResponse(f, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename=buyer-info.csv'
        return response

    download_csv.short_description = "Download CSV file for selected buyers"
    pass

@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    pass

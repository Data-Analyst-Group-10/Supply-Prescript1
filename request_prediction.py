import json
import os
import threading
import time
import urllib.request
import uvicorn

from app.main import app

os.chdir(r'C:\Supply-Prescript\backend\supplyprescript-backend')

thread = threading.Thread(target=lambda: uvicorn.run(app, host='127.0.0.1', port=8000, log_level='warning'), daemon=True)
thread.start()

for _ in range(50):
    try:
        with urllib.request.urlopen('http://127.0.0.1:8000/docs', timeout=2) as resp:
            if resp.status == 200:
                break
    except Exception:
        time.sleep(0.2)

payload = json.dumps({
    'features': {
        'Type': 'DEBIT',
        'Days for shipping (real)': 3,
        'Days for shipment (scheduled)': 2,
        'Benefit per order': 10.5,
        'Sales per customer': 100.0,
        'Delivery Status': 'Late delivery',
        'Late_delivery_risk': 1,
        'Category Id': 1,
        'Category Name': 'Office Supplies',
        'Customer City': 'Paris',
        'Customer Country': 'France',
        'Customer Id': 1,
        'Customer Segment': 'Consumer',
        'Customer State': 'Ile-de-France',
        'Customer Zipcode': 75001,
        'Department Id': 1,
        'Department Name': 'Sales',
        'Latitude': 48.8566,
        'Longitude': 2.3522,
        'Market': 'Europe',
        'Order Status': 'PENDING',
        'Shipping Mode': 'Standard',
    }
}).encode()
req = urllib.request.Request(
    'http://127.0.0.1:8000/api/v1/predict',
    data=payload,
    headers={'Content-Type': 'application/json'},
    method='POST',
)
with urllib.request.urlopen(req, timeout=20) as resp:
    print(resp.status)
    print(resp.read().decode())

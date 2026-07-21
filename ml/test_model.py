from inference import make_prediction
import pandas as pd


sample_input = {

    "Type": "DEBIT",
    "Days for shipping (real)": 4,
    "Days for shipment (scheduled)": 3,
    "Benefit per order": 20,
    "Sales per customer": 200,
    "Delivery Status": "Late delivery",
    "Late_delivery_risk": 1,

    "Category Id": 1,
    "Category Name": "Sporting Goods",

    "Customer City": "Los Angeles",
    "Customer Country": "USA",
    "Customer Id": 1,
    "Customer Segment": "Consumer",
    "Customer State": "CA",
    "Customer Zipcode": 90001,

    "Department Id": 1,
    "Department Name": "Fitness",

    "Latitude": 34.05,
    "Longitude": -118.24,

    "Market": "USCA",

    "Order City": "Los Angeles",
    "Order Country": "USA",
    "Order Customer Id": 1,
    "Order Id": 1,

    "Order Item Cardprod Id": 1,
    "Order Item Discount": 10,
    "Order Item Discount Rate": 0.05,
    "Order Item Id": 1,
    "Order Item Product Price": 100,
    "Order Item Profit Ratio": 0.2,
    "Order Item Quantity": 2,

    "Sales": 200,
    "Order Item Total": 190,
    "Order Profit Per Order": 40,

    "Order Region": "West",
    "Order State": "CA",
    "Order Status": "COMPLETE",
    "Order Zipcode": 90001,

    "Product Card Id": 1,
    "Product Category Id": 1,
    "Product Name": "Product A",
    "Product Price": 100,
    "Product Status": 0
}


try:

    result = make_prediction(
        pd.DataFrame([sample_input])
    )

    print("Prediction Result:")
    print(result)


except Exception as e:

    print("Error:")
    print(e)
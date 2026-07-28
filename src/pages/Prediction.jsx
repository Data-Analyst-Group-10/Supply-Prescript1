import { useState } from "react";
import { predictShipping } from "../services/api";

function Prediction() {
  const [features, setFeatures] = useState({
    Type: "DEBIT",
    "Days for shipping (real)": 4,
    "Benefit per order": 35.5,
    "Sales per customer": 250,
    "Delivery Status": "Advance shipping",
    Category_Name: "Sporting Goods",
    Customer_City: "Bangalore",
    Product_Price: 250,
  });

  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFeatures({
      ...features,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);

      const result = await predictShipping(features);

      setPrediction(result.prediction || result.predicted_label);
    } catch (error) {
      alert("Prediction Failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Shipping Prediction
      </h1>

      <div className="space-y-4 max-w-xl">

        <input
          className="border p-2 w-full"
          name="Type"
          value={features.Type}
          onChange={handleChange}
          placeholder="Type"
        />

        <input
          className="border p-2 w-full"
          name="Days for shipping (real)"
          type="number"
          value={features["Days for shipping (real)"]}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full"
          name="Benefit per order"
          type="number"
          value={features["Benefit per order"]}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full"
          name="Sales per customer"
          type="number"
          value={features["Sales per customer"]}
          onChange={handleChange}
        />

        <button
          onClick={handlePredict}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {loading ? "Predicting..." : "Predict"}
        </button>

        {prediction && (
          <div className="bg-green-100 p-4 rounded">
            <h2 className="font-bold">Prediction Result</h2>
            <p>{prediction}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Prediction;
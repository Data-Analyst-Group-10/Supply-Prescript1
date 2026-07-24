import { useState } from "react";
import { predictShipping } from "../services/api";

function Prediction() {

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  const handlePrediction = async () => {

    try {

      setLoading(true);

      const features = {
        "Type": "DEBIT",
        "Days for shipping (real)": 4,
        "Benefit per order": 35.5,
        "Sales per customer": 250,
        "Late_delivery_risk": 0,
        "Product Price": 1000
      };


      const response = await predictShipping(features);

      setResult(response.prediction);

    } catch (error) {

      console.error(error);
      setResult("Prediction Failed");

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold">
        Shipping Prediction
      </h1>


      <button
        onClick={handlePrediction}
        className="mt-5 bg-blue-600 text-white px-5 py-2 rounded"
      >
        {
          loading 
          ? "Predicting..."
          : "Predict Shipping"
        }
      </button>


      {
        result && (
          <div className="mt-5 text-xl">
            Result: {result}
          </div>
        )
      }


    </div>

  );
}

export default Prediction;
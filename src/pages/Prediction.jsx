import { useState } from "react";
import { predictShipping } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

function Prediction() {
  const [formData, setFormData] = useState({
    Type: "DEBIT",
    "Days for shipping (real)": 4,
    "Benefit per order": 35.5,
    "Sales per customer": 250,
  });

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handlePredict = async () => {
    try {
      setLoading(true);

      const response = await predictShipping(formData);

      setResult(response.predicted_label);

      toast.success("Prediction Completed Successfully!");

      setHistory((prev) => [
        {
          type: formData.Type,
          prediction: response.predicted_label,
          days: formData["Days for shipping (real)"],
          sales: formData["Sales per customer"],
        },
        ...prev,
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Prediction Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Shipping Prediction
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl">

        <input
          className="border p-2 rounded w-full mb-3"
          name="Type"
          value={formData.Type}
          onChange={handleChange}
          placeholder="Type"
        />

        <input
          className="border p-2 rounded w-full mb-3"
          type="number"
          name="Days for shipping (real)"
          value={formData["Days for shipping (real)"]}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded w-full mb-3"
          type="number"
          name="Benefit per order"
          value={formData["Benefit per order"]}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded w-full mb-3"
          type="number"
          name="Sales per customer"
          value={formData["Sales per customer"]}
          onChange={handleChange}
        />

        <button
          onClick={handlePredict}
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 w-full"
        >
          Predict
        </button>

        {loading && <LoadingSpinner />}

        {result && (
          <div className="mt-6 bg-green-100 border border-green-500 p-4 rounded">
            <h2 className="font-bold text-lg">
              Prediction Result
            </h2>

            <p className="text-2xl font-bold text-green-700 mt-2">
              {result}
            </p>
          </div>
        )}

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-2xl font-bold">
            Prediction History
          </h2>

          <button
            onClick={() => setHistory([])}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear History
          </button>

        </div>

        {history.length === 0 ? (

          <p className="text-gray-500">
            No predictions yet.
          </p>

        ) : (

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-3">Type</th>
                <th className="p-3">Days</th>
                <th className="p-3">Sales</th>
                <th className="p-3">Prediction</th>
              </tr>

            </thead>

            <tbody>

              {history.map((item, index) => (

                <tr
                  key={index}
                  className="border-b hover:bg-gray-100 text-center"
                >
                  <td className="p-3">{item.type}</td>
                  <td className="p-3">{item.days}</td>
                  <td className="p-3">{item.sales}</td>
                  <td className="p-3 font-bold text-green-600">
                    {item.prediction}
                  </td>
                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

export default Prediction;
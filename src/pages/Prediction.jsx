const API_URL = "http://127.0.0.1:8000/api/v1";

export async function predictShipping(features) {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        features,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Prediction failed");
    }

    return data;
  } catch (error) {
    console.error("Prediction Error:", error);
    throw error;
  }
}
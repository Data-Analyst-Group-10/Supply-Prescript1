import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

export async function predictShipping(features) {
  try {
    const response = await API.post("/predict", {
      features,
    });

    return response.data;

  } catch (error) {
    console.error("Prediction Error:", error);
    throw error;
  }
}

export default API;
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/v1";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =========================
   Inventory Excel Upload
========================= */

export const uploadInventoryExcel = async (file) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await API.post(
    "/inventory/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

/* =========================
   Prediction
========================= */

export const predictShipping = async (features) => {
  const response = await API.post(
    "/predict",
    {
      features,
    }
  );

  return response.data;
};

export default API;
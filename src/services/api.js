import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
});

// ==============================
// Inventory APIs
// ==============================

export const getInventory = async () => {
  const response = await API.get("/inventory/");
  return response.data;
};

export const addInventory = async (data) => {
  const response = await API.post("/inventory/", data);
  return response.data;
};

export const updateInventory = async (id, data) => {
  const response = await API.put(`/inventory/${id}`, data);
  return response.data;
};

export const deleteInventory = async (id) => {
  const response = await API.delete(`/inventory/${id}`);
  return response.data;
};

// Upload Excel File
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

// ==============================
// Orders APIs
// ==============================

export const getOrders = async () => {
  const response = await API.get("/orders/");
  return response.data;
};

export const addOrder = async (data) => {
  const response = await API.post("/orders/", data);
  return response.data;
};

// ==============================
// Suppliers APIs
// ==============================

export const getSuppliers = async () => {
  const response = await API.get("/suppliers/");
  return response.data;
};

export const addSupplier = async (data) => {
  const response = await API.post("/suppliers/", data);
  return response.data;
};

// ==============================
// Prediction API
// ==============================

export const predictShipping = async (features) => {
  const response = await API.post("/predict", {
    features,
  });

  return response.data;
};

export default API;
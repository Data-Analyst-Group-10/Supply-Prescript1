const API_URL = "http://127.0.0.1:8000/api/v1";

export async function predictShipping(features) {

    const response = await fetch(
        `${API_URL}/predict`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                features: features
            })
        }
    );

    if (!response.ok) {
        throw new Error("Prediction failed");
    }

    return await response.json();
}
import { useState } from 'react'
import './App.css'

const initialPayload = {
  Type: 'DEBIT',
  'Days for shipping (real)': 3,
  'Days for shipment (scheduled)': 2,
  'Benefit per order': 10.5,
  'Sales per customer': 100.0,
  'Delivery Status': 'Late delivery',
  Late_delivery_risk: 1,
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
  Latitude: 48.8566,
  Longitude: 2.3522,
  Market: 'Europe',
  'Order Status': 'PENDING',
  'Shipping Mode': 'Standard',
}

function App() {
  const [payload, setPayload] = useState(initialPayload)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features: payload }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail || 'Prediction failed')
      }

      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (key, value) => {
    setPayload((current) => ({ ...current, [key]: value }))
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">SupplyPrescript</p>
          <h1>Closed-loop prescriptive analytics</h1>
          <p className="subtitle">
            Run a demand and fulfillment prediction against the trained backend model.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="prediction-form">
          {Object.entries(payload).map(([key, value]) => (
            <label key={key} className="field">
              <span>{key}</span>
              <input
                value={value}
                onChange={(event) => updateField(key, event.target.value)}
                type={typeof value === 'number' ? 'number' : 'text'}
              />
            </label>
          ))}
          <button type="submit" disabled={loading}>
            {loading ? 'Predicting…' : 'Run prediction'}
          </button>
        </form>
      </section>

      <section className="results-card">
        <h2>Prediction output</h2>
        {error ? <p className="error">{error}</p> : null}
        {result ? (
          <div className="result-block">
            <p><strong>Prediction:</strong> {result.prediction}</p>
            <p><strong>Label:</strong> {result.predicted_label}</p>
            <p><strong>Features used:</strong> {result.features_used.length}</p>
          </div>
        ) : (
          <p className="muted">Submit the form to see the model output.</p>
        )}
      </section>
    </main>
  )
}

export default App

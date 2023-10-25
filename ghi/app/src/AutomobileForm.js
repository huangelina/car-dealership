import { useState, useEffect } from 'react';

export default function AutomobileForm() {
const [formData, setFormData] = useState({
    color: '',
    year: '',
    vin: '',
    model_id: '',
});
const [models, setModels] = useState([]);

const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
};

useEffect(() => {
    const fetchData = async () => {
    const url = 'http://localhost:8100/api/models/';
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        setModels(data.models);
    }
    };

    fetchData();
}, []);

const handleSubmit = async (event) => {
    event.preventDefault();

    const autoUrl = 'http://localhost:8100/api/automobiles/';
    const fetchConfig = {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json',
    },
    };

    const response = await fetch(autoUrl, fetchConfig);
    if (response.ok) {
    setFormData({
        color: '',
        year: '',
        vin: '',
        model_id: '',
    });
    }
}

return (
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1>Add an Automobile to Inventory</h1>
        <form onSubmit={handleSubmit}>
            {['color', 'year', 'vin'].map(fieldName => (
            <div key={fieldName} className="form-floating mb-3">
                <input
                onChange={handleInputChange}
                value={formData[fieldName]}
                placeholder={fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                required type="text"
                id={fieldName}
                name={fieldName}
                className="form-control"
                />
                <label htmlFor={fieldName}>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</label>
            </div>
            ))}
            <div className="mb-3">
            <label htmlFor="model_id" className="form-label">Model</label>
            <select
                onChange={handleInputChange}
                value={formData.model_id}
                required id="model_id"
                name="model_id"
                className="form-select"
            >
                <option value="">Choose a Model</option>
                {models.map(model => (
                <option key={model.id} value={model.id}>
                    {model.name}
                </option>
                ))}
            </select>
            </div>
            <button className="btn btn-primary">Create</button>
        </form>
        </div>
    </div>
    </div>
);
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModelForm() {
const [formData, setFormData] = useState({
    name: '',
    picture_url: '',
    manufacturer_id: '',
});
const [manufacturers, setManufacturers] = useState([]);
const [submitError, setSubmitError] = useState(false);
const [noDataError, setNoDataError] = useState(false);
const navigate = useNavigate();

const getData = async () => {
    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);

    if (response.ok) {
    const data = await response.json();
    setManufacturers(data.manufacturers);
    if (data.manufacturers.length <= 0) {
        setNoDataError(true);
    }
    }
};

useEffect(() => {
    getData();
}, []);

const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = "http://localhost:8100/api/models/";

    const fetchConfig = {
    method: "post",
    body: JSON.stringify(formData),
    headers: {
        'Content-Type': 'application/json',
    },
    };

    const response = await fetch(locationUrl, fetchConfig);

    if (response.ok) {
    setFormData({
        name: '',
        picture_url: '',
        manufacturer_id: '',
    });

    navigate("/models");
    } else {
    setSubmitError(true);
    };
};

const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({...formData, [inputName]: value});
};

const addManufacturer = (e) => {
    navigate("/manufacturers/create");
}

return (
    <div className="row">
    <div className="offset-3 col-6">
        {noDataError &&
        <div className="alert alert-danger py-2 mt-3" role="alert">
            <h4 className="alert-heading">Wait - No Manufacturers!</h4>
            <p>You must add at least one manufacturer before adding vehicle models. Would you like to add a manufacturer now?</p>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button onClick={() => addManufacturer()} className="btn btn-outline-secondary">Add a Manufacturer</button>
            </div>
        </div>
        }
        <div className="shadow p-4 mt-4">
        <h1>Create a Vehicle Model</h1>
        {submitError &&
            <div className="alert alert-danger py-2" role="alert">
            <h4 className="alert-heading">Could not Create Vehicle Model</h4>
            <p>Ensure name does not exceed maximum length.</p>
            </div>
        }
        <form onSubmit={handleSubmit} id="new-technician-form">
            <div className="form-floating mb-3">
            <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
            <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handleFormChange} value={formData.picture_url} placeholder="Picture URL" required type="url" name="picture_url" id="picture_url" className="form-control" />
            <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
            <select onChange={handleFormChange} value={formData.manufacturers} required name="manufacturer_id" id="manufacturer_id" className="form-select">
                <option value="">Choose a manufacturer</option>
                {manufacturers.map(manufacturer => {
                return (
                    <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>
                );
                })}
            </select>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    </div>
);
};

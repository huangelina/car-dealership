import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SalesPersonForm() {
const [formData, setFormData] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
});
const [idError, setIdError] = useState(false);
const navigate = useNavigate();

const handleSubmit = async (event) => {
    event.preventDefault();

    const locationUrl = "http://localhost:8090/api/salespeople/";

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
        employee_id: '',
        first_name: '',
        last_name: '',
    });

    navigate("/salespeople");
    } else {
    setIdError(true);
    }
}

const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({...formData, [inputName]: value});
}

return (
    <div className="row">
    <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
        <h1>Add a Salesperson</h1>
        {idError &&
            <div className="alert alert-danger py-2" role="alert">
            <h4 className="alert-heading">Could not Create Salesperson</h4>
            <p>Ensure values do not exceed maximum length and the employee ID is unique.</p>
            </div>
        }
        <form onSubmit={handleSubmit} id="new-salesperson-form">
            <div className="form-floating mb-3">
            <input onChange={handleFormChange} value={formData.first_name} placeholder="First Name" required type="text" name="first_name" id="first_name" className="form-control" />
            <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handleFormChange} value={formData.last_name} placeholder="Last Name" required type="text" name="last_name" id="last_name" className="form-control" />
            <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
            <input onChange={handleFormChange} value={formData.employee_id} placeholder="Employee ID" required type="text" name="employee_id" id="employee_id" className="form-control" />
            <label htmlFor="employee_id">Employee ID</label>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
        </div>
    </div>
    </div>
);
};

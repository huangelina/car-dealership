import React from 'react';


function ManufacturerForm() {
const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {};
    new FormData(e.target).forEach((value, key) => data[key] = value);

    const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
    const fetchingConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(manufacturerUrl, fetchingConfig);
    if(response.ok) {
        const newManufacturer = await response.json();
        console.log(newManufacturer)
        e.target.reset();
    }
}

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="card-title">Creat a Manufacturer</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <input type="text" className="form-control" name="name" placeholder="Manufacturer name..."/>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

export default ManufacturerForm;

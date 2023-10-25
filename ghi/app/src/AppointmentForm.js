import React from 'react';
import { useEffect, useState } from 'react';

function AppointmentForm() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };


const handleSubmit = async (e) => {
    e.preventDefault()
    const dateTime = `${date} ${time}`;
    console.log(dateTime);

    const data = {};
    new FormData(e.target).forEach((value, key) => data[key] = value);

    const appointmentUrl = 'http://localhost:8080/api/appointments/';
    const fetchingConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };


    const response = await fetch(appointmentUrl, fetchingConfig);
    if(response.ok) {
        const newAppointment = await response.json();
        console.log(newAppointment)
        e.target.reset();

    }
}

const [technicians, setTechnicians] = useState([]);
const fetchData = async () => {
    const url = 'http://localhost:8080/api/technicians/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians)
    }
}

useEffect(() => {
  fetchData();
}, []);


      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card mt-4">
                <div className="card-body">
                  <h3 className="card-title">Create a service appointment</h3>
                  <form onSubmit={handleSubmit}>
                    Automobile VIN
                    <div className="mb-3">
                      <input type="text" className="form-control" name="vin"/>
                    </div>
                    Name
                    <div className="mb-3">
                      <input type="text" className="form-control" name="customer"/>
                    </div>
                    Date
                    <div className="mb-3">
                      <input type="date" className="form-control" value={date} onChange={handleDateChange} />
                    </div>
                    Time
                    <div className="mb-3">
                      <input type="time" className="form-control" value={time} onChange={handleTimeChange} />
                    </div>
                    Technician
                    <div className="mb-3">
                      <select className="form-select" name="technician" id="technician" required>
                        <option value="">Choose a technician</option>
                        {technicians.map((tech) => (<option key={tech.employee_id} value={tech.employee_id}> {tech.first_name} {tech.last_name} </option> ))}
                      </select>
                    </div>
                    Reason
                    <div className="mb-3">
                      <input type="text" className="form-control" name="reason"/>
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


export default AppointmentForm;

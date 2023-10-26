import { useEffect, useState } from 'react';

function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
}

function formatTime(date) {
    const d = new Date(date);
    const minutes = d.getMinutes();
    const hours = d.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? '12' : (hours % 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:00 ${ampm}`;
}

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [tempVIN, setTempVIN] = useState("");
    const [searchVIN, setSearchVIN] = useState("");

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const searchAppointments = appointments.filter(appointment =>
        appointment.vin.toLowerCase().includes(searchVIN.toLowerCase())
    );

    const handleSearch = () => {
        setSearchVIN(tempVIN);
    };

    return (
        <div>
            <h1>Service History</h1>

            <div className="mb-3 d-flex">
                <input
                    type="text"
                    placeholder="Search by VIN..."
                    value={tempVIN}
                    onChange={(e) => setTempVIN(e.target.value)}
                    className="form-control me-2"
                />
                <button onClick={handleSearch} className="btn btn-success">Search</button>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {searchAppointments.map(appointment => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                            <td>{appointment.customer}</td>
                            <td>{formatDate(appointment.date_time)}</td>
                            <td>{formatTime(appointment.date_time)}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceHistory;

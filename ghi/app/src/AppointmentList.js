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

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

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

  return (
    <div>
      <h1>Service Appointments</h1>
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
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.vin}</td>
              <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
              <td>{appointment.customer}</td>
              <td>{formatDate(appointment.date_time)}</td>
              <td>{formatTime(appointment.date_time)}</td>
              <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
              <td>{appointment.reason}</td>
              <td>{appointment.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;

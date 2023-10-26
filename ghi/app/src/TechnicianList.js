import { useEffect, useState } from "react";


function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/technicians/');

        if (response.ok) {
        const data = await response.json();
        setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
        <h1>Technicians</h1>
        <table className="table table-striped">
            <thead>
            <tr>
                <th>Employee ID</th>
                <th>First Name</th>
                <th>Last Name</th>
            </tr>
            </thead>
            <tbody>
            {technicians.map(technicians => (
                <tr key={technicians.id}>
                <td>{technicians.employee_id}</td>
                <td>{technicians.first_name}</td>
                <td>{technicians.last_name}</td>

                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
  }

export default TechnicianList;

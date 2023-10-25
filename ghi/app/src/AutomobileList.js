import React, { useState, useEffect } from 'react';

export default function AutomobileList() {
    const [automobiles, setAutomobiles] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const url = 'http://localhost:8100/api/automobiles/';
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                setAutomobiles(data.autos);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1 className="mb-3 mt-3">Automobiles</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles.map(automobile => {
                        const sold = automobile.sold ? "Yes" : "No";
                        return (
                            <tr key={automobile.id}>
                                <td>{automobile.vin}</td>
                                <td>{automobile.color}</td>
                                <td>{automobile.year}</td>
                                <td>{automobile.model.name}</td>
                                <td>{automobile.model.manufacturer.name}</td>
                                <td>{sold}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

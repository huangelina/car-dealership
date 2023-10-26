import { useEffect, useState } from 'react';

function SaleList() {
    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setSales(data.sales);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);



    return (
        <div>
            <h1>sales</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Name</th>
                        <th>Customer</th>
                        <th>VIN</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map(sale => {
                    const salespersonFullName = `${sale.salesperson.first_name} ${sale.salesperson.last_name}`
                    const customerFullName = `${sale.customer.first_name} ${sale.customer.last_name}`
                        return (
                        <tr key={sale.id}>
                            <td>{sale.salesperson.employee_id}</td>
                            <td>{salespersonFullName}</td>
                            <td>{customerFullName}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                        </tr>
                        );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default SaleList;

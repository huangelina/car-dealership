import { useEffect, useState } from "react";

function SalespersonHistory() {
const [salespeople, setSalespeople] = useState([]);
const [salesperson, setSalesperson] = useState("");
const [sales, setSales] = useState([]);

const handleChooseSalesperson = (event) => {
    setSalesperson(event.target.value);
};
const fetchData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
    const data = await response.json();
    setSalespeople(data.salespeople);
    }

    const salesUrl = "http://localhost:8090/api/sales/";
    const salesResponse = await fetch(salesUrl);
    if (salesResponse.ok) {
    const salesData = await salesResponse.json();
    setSales(salesData.sales);
    }
};
useEffect(() => {
    fetchData();
}, []);
return (
    <div>
    <h1>Salesperson History</h1>
    <div className="mb-3">
        <select
        onChange={handleChooseSalesperson}
        name="salesperson"
        id="salesperson"
        className="form-select"
        value={salesperson}
        >
        <option value="">Choose a salesperson</option>
        {salespeople.map((salesperson) => {
            return (
            <option key={salesperson.id} value={salesperson.employee_id}>
                {salesperson.first_name} {salesperson.last_name}
            </option>
            );
        })}
        </select>
    </div>
    <table className="table table-striped">
        <thead>
        <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
        </tr>
        </thead>
        <tbody>
        {sales
            .filter((sale) => {
            return sale.salesperson.employee_id.toString() === salesperson;
            })
            .map((sale) => {
            return (
                <tr key={sale.id}>
                <td>
                    {sale.salesperson.first_name} {sale.salesperson.last_name}
                </td>
                <td>
                    {sale.customer.first_name} {sale.customer.last_name}
                </td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
                </tr>
            );
            })}
        </tbody>
    </table>
    </div>
);
}

export default SalespersonHistory;

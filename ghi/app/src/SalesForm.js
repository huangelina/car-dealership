import { useEffect, useState } from 'react';

function SaleForm ({fetchSales, fetchAutomobiles}) {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespeople, setSalespeople] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [automobile, setAutomobile] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');

    const handleAutomobileChange = event => {
        setAutomobile(event.target.value);
    };
    const handleSalespersonChange = event => {
        setSalesperson(event.target.value);
    };
    const handleCustomerChange = event => {
        setCustomer(event.target.value);
    };
    const handlePriceChange = event => {
        setPrice(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {}
        data.automobile = automobile;
        data.salesperson = salesperson;
        data.customer = customer;
        data.price = price;

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'applcation/json',
            },
        };
        const response = await fetch(saleUrl, fetchConfig);


        const autoUrl = `http://localhost:8100${automobile}`;
        const autoFetchConfig = {
            method: "put",
            body: JSON.stringify({"sold": true}),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const automobileResponse = await fetch(autoUrl, autoFetchConfig);

        if (response.ok && automobileResponse.ok) {
            fetchSales();
            fetchAutomobiles();
            setAutomobile('');
            fetchData();
            setSalesperson('');
            setCustomer('');
            setPrice('');
        };
    };

    const fetchData = async () => {
        const autoUrl = 'http://localhost:8090/api/cars/';
        const automobileResponse = await fetch(autoUrl);
        if (automobileResponse.ok) {
            const data = await automobileResponse.json();
            setAutomobiles(data.automobiles);
        };
        const salespersonUrl = "http://localhost:8090/api/salespeople/";
        const salespersonResponse = await fetch(salespersonUrl);
        if (salespersonResponse.ok) {
            const data = await salespersonResponse.json();
            setSalespeople(data.salespeople);
        };
        const customerUrl = 'http://localhost:8090/api/customers';
        const customerResponse = await fetch(customerUrl);
        if (customerResponse.ok) {
            const data = await customerResponse.json();
            setCustomers(data.customers);
        };


    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit} id="record-sale-form">
                    <label htmlFor="automobile">Automobile VIN</label>
                        <div className="mb-3">
                            <select onChange={handleAutomobileChange} required name="automobile" id="automobile" className="form-select" value={automobile}>
                                <option value="">Choose an Automobile VIN</option>
                                {automobiles.map(automobile => {
                                    return (
                                        <option key={automobile.import_href} value={automobile.import_href}>
                                            {automobile.vin}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <label htmlFor="salesperson">Salesperson</label>
                        <div className="mb-3">
                            <select onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select" value={salesperson}>
                                <option value="">Choose a Salesperson</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.id} value={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <label htmlFor="customer">Customer</label>
                        <div className="mb-3">
                            <select onChange={handleCustomerChange} required name="customer" id="customer" className="form-select" value={customer}>
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <label htmlFor="price">Price</label>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} placeholder="$0" type="text" name="price" id="price" />
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
};
export default SaleForm;

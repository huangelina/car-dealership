import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import SalesPersonForm from './SalesPersonForm';
import SalesPersonHistory from './SalesPersonHistory';
import CustomerForm from './CustomerForm';
import CustomerList from './CustomerList';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import AutomobileForm from './AutomobileForm';
import AutomobileList from './AutomobileList';
import ManufacturerForm from './ManufacturerForm';
import ManufacturerList from './ManufacturerList';
import ModelForm from './ModelForm';
import ModelList from './ModelList';





function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="salespeople">
            <Route index element={<SalesPeopleList />} />
            <Route path="create" element={<SalesPersonForm />} />
            <Route path="history" element={<SalesPersonHistory />} />
          </Route>
          <Route path="customers">
            <Route index element={<CustomerList />} />
            <Route path="create" element={<CustomerForm />} />
          </Route>
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="create" element={<SalesForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutomobileList />} />
            <Route path="create" element={<AutomobileForm />} />
          </Route>
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="create" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="create" element={<ModelForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

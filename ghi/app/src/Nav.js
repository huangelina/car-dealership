import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <div className="d-flex">
              <li className="nav-item">
                <NavLink className="nav-link" to="salespeople">Sales People List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="salespeople/create">Add a Salesperson</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="salespeople/history">Sales Person History</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="customers">Customer List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="customers/create">Add a Customer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="sales">Sales List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="sales/create">Add a Sale</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="technicians">Technicians</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="technicians/create">Add a Technician</NavLink>
              </li>
            </div>
            <div className="d-flex">
              <li className="nav-item">
                <NavLink className="nav-link" to="appointments">Service appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="appointments/create">Create a Service appointments</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="appointments/history">Service History</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="automobiles">Automobile List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="automobiles/create">Add an Automobile</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="manufacturers">Manufacturers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="manufacturers/create">Create a Manufacturer</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="models">Models</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="models/create">Create a Model</NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

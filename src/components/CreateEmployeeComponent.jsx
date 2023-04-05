import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });


  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    EmployeeService.createEmployee(employee).then(res => {
      navigate('/employees');
    });
    
  };

  const handleCancel = () => {
    navigate("/employees");
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center mt-3">Add Employee</h3>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input placeholder="First Name"
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={employee.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input placeholder="Last Name"
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={employee.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Id</label>
                  <input placeholder="example@gmail.com"
                    type="email"
                    name="emailId"
                    className="form-control"
                    value={employee.emailId}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleCancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from '../services/EmployeeService';

const CreateEmployeeComponent = () => {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // If the id is '_add', we don't need to fetch any data.
    if (id !== "_add") {
      EmployeeService.getEmployeeById(id).then((res) => {
        const employeeData = res.data;
        setEmployee({
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          emailId: employeeData.emailId
        });
      });
    }
  }, [id]);

  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    const employeeData = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      emailId: employee.emailId
    };

    if (id === '_add') {
      EmployeeService.createEmployee(employeeData).then(res => {
        navigate('/employees');
      });
    } else {
      EmployeeService.updateEmployee(employeeData, id).then(res => {
        navigate('/employees');
      });
    }
  }

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

  const getTitle = () => {
    if (id === '_add') {
      return <h3 className="text-center">Add Employee</h3>;
    } else {
      return <h3 className="text-center">Update Employee</h3>;
    }
  }
  

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    className="form-control"
                    value={employee.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    className="form-control"
                    value={employee.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email Id</label>
                  <input
                    placeholder="example@gmail.com"
                    type="email"
                    name="emailId"
                    className="form-control"
                    value={employee.emailId}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>Save</button>
                <button className="btn btn-danger" onClick={handleCancel} style={{marginLeft: "10px"}}>Cancel</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployeeComponent;

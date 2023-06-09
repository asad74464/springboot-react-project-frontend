import React from "react";
import EmployeeService from "../services/EmployeeService";
import { useNavigate } from 'react-router-dom';

function ListEmployeeComponent() {
  const navigate = useNavigate();
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const deleteEmployee = (id) => {
    EmployeeService.deleteEmployee(id).then((res) => {
      setEmployees(employees.filter((employee) => employee.id !== id));
    });
  };
  const viewEmployee = (id) => {
    navigate(`/view-employee/${id}`);
  };
  const editEmployee = (id) => {
    navigate(`/add-employee/${id}`);
  };

  const addEmployee = () => {
    navigate('/add-employee/_add');
  };

  return (
    <div>
      <h2 className="text-center">Employees List</h2>
      <button className="btn btn-primary mb-2" onClick={addEmployee}>
        <i class="bi bi-person-fill"></i>{" "}Add Employee
      </button>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Employee First Name</th>
              <th> Employee Last Name</th>
              <th> Employee Email Id</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td> {employee.firstName} </td>
                <td> {employee.lastName}</td>
                <td> {employee.emailId}</td>
                <td>
                  <button
                    onClick={() => editEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    <i class="bi bi-pencil"></i>{" "}Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteEmployee(employee.id)}
                    className="btn btn-danger"
                  >
                  <i class="bi bi-trash"></i>{" "}Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewEmployee(employee.id)}
                    className="btn btn-info"
                  >

                    View{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListEmployeeComponent;

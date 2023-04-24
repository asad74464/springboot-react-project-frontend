import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function ViewEmployeeComponent(props) {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    EmployeeService.getEmployeeById(id).then((res) => {
      setEmployee(res.data);
    });
  }, [id]);

  return (
    <div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <div className="card-header"><h3 className="text-center"> View Employee Details</h3></div>
        <div className="card-body">
          <li className="list-group-item">
            <b>Employee First Name: </b>
             {employee.firstName}
          </li>
          <li className="list-group-item">
            <b> Employee Last Name: </b>
             {employee.lastName}
          </li>
          <li className="list-group-item">
            <b> Employee Email Address: </b>
            {employee.emailId}
          </li>
          <Link className="btn btn-primary my-2" to={"/"}>
          <i class="bi bi-house"></i>{" "}Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeComponent;

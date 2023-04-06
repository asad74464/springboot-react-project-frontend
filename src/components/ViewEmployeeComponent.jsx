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
          <div className="row">
            <div><b>Employee First Name: </b></div>
             <div>{employee.firstName}</div>
          </div>
          <div className="row">
            <b> Employee Last Name: </b>
            <div> {employee.lastName}</div>
          </div>
          <div className="row">
            <b> Employee Email ID: </b>
            <div> {employee.emailId}</div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewEmployeeComponent;

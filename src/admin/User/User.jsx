import React, { useEffect, useState } from "react";
import BreadCrumb from "../../components/CustomHooks/BreadCrumb";
import Sidebar from "../Sidebar";

export default function User() {
  let [data, setData] = useState([]);

  async function deleteItem(id) {
    if (window.confirm("Are You Sure Your Want to Delete that Item ")) {
      let response = await fetch("http://localhost:8000/user/" + id, {
        method: "delete",
        headers: {
          "content-type": "application/json",
        },
      });
      response = await response.json();

      getAPIData();
    }
  }
  async function getAPIData() {
    let response = await fetch("http://localhost:8000/user", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
    });
    response = await response.json();
    if (response) setData(response);
  }
  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <>
      <BreadCrumb title="User" />
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <h5 className="bg-primary text-center text-light p-2">User</h5>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td className="fw-bold">{item.role}</td>
                      <td>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="btn text-danger"
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

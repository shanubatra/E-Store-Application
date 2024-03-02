import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProfileComponent from "../components/CustomHooks/ProfileComponent";
import BreadCrumb from "../components/CustomHooks/BreadCrumb";

export default function AdminHome() {
  let [user, setUser] = useState([]);
  async function getAPIData() {
    let response = await fetch(
      "http://localhost:8000/user/" + localStorage.getItem("userid"),
      {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      }
    );
    response = await response.json();
    if (response) {
      setUser(response);
    }
  }
  useEffect(() => {
    getAPIData();
  }, []);
  return (
    <>
      <BreadCrumb title="Admin" />

      <div>
        <div className="container-fluid py-5">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <h5 className="bg-primary text-light text-center p-2 ">
                Admin Home
              </h5>
              <div className="col-md-6 float-start">
                {user.pic ? (
                  <img
                    src={`/product-images/${user.pic}`}
                    height="380px"
                    width="98%"
                    alt=""
                  />
                ) : (
                  <img
                    src="/product-images/avatar.png"
                    height="430px"
                    width="100%"
                    alt=""
                  />
                )}
              </div>
              <div className="col-md-6 float-end">
                <ProfileComponent user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

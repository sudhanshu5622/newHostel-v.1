import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPages.css";

function RoleCards() {

  const navigate = useNavigate();

  const handleStudentEnter = () => {
    navigate("/login");
  };

 const handleOwnerEnter = () => {
  navigate("/owner-services");
};


  const handleAdminEnter = () => {
    navigate("/admin-pannel");
  };

  return (
    <div className="container">
      <h1 className="title">Hostel Management Portal</h1>

      <div className="card-wrapper">

        <div className="card">
          <h2>Student</h2>
          <p>Search hostel, book rooms and manage bookings.</p>
          <button onClick={handleStudentEnter}>
            Enter Student Panel
          </button>
        </div>

        <div className="card">
          <h2>Hostel Owner</h2>
          <p>Manage rooms, bookings and hostel details.</p>
          <button onClick={handleOwnerEnter}>
            Enter Owner Panel
          </button>
        </div>

        <div className="card">
          <h2>Admin</h2>
          <p>Control users and platform management.</p>
          <button onClick={handleAdminEnter}>
            Enter Admin Panel
          </button>
        </div>

      </div>
    </div>
  );
}

export default RoleCards;

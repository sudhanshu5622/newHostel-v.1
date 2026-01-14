import React, { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function OwnerDashboard() {
  const [data, setData] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.get("/dashboard");
        setData(res.data);
      } catch (e) {
        // if auth failed remove token and redirect
        localStorage.removeItem("token");
        nav("/login");
      }
    }
    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    nav("/login");
  };

  return (
    <div className="card">
      <h2>Owner Dashboard</h2>
      {data ? (
        <>
          <p>{data.message}</p>
          <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(data.owner, null, 2)}</pre>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

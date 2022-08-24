import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import WidthSpinner from "../../components/WidthSpinner";
import { useHeaderAccessToken } from "../../hooks/useHeaderAccessToken";

const Users = () => {
  const headerAccessToken = useHeaderAccessToken();
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    const res = await axios.get("/users/getusers", headerAccessToken);
    if (res.status === 200) {
      setUsers(res.data);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="page">
      <WidthSpinner data={users}>
        <h1>Users</h1>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <p className="fw-bold mb-1">{user.name}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p className="fw-normal mb-1">{user.position}</p>
                </td>
                <td>
                  <p className="text-muted mb-0">{user.email}</p>
                </td>
                <td>
                  <p className="text-muted mb-0">{user.phone}</p>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-link btn-sm btn-rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WidthSpinner>
    </div>
  );
};

export default Users;

import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import useToast from "../../hooks/useToast";
import WidthSpinner from "../../components/WidthSpinner";
import { useHeaderAccessToken } from "../../hooks/useHeaderAccessToken";
import { PersonPlusFill, Pencil, Trash } from "react-bootstrap-icons";
import UserAddModal from "../../components/users-component/UserAddModal";

const Users = () => {
  const headerAccessToken = useHeaderAccessToken();
  const [users, setUsers] = useState([]);
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("/users/getusers", headerAccessToken);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      useToast(error.message);
    }
  };
  useEffect(() => {
    fetchAllUsers();
  }, [users]);

  return (
    <div className="page">
      <WidthSpinner data={users}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Users</h1>{" "}
          <button
            className="btn btn-primary d-flex align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#userAddModal"
          >
            Add User <PersonPlusFill style={{ marginLeft: 10, fontSize: 18 }} />
          </button>
        </div>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr style={{ backgroundColor: "#e9ecef" }}>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Position</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">Actions</th>
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
                  <p className="text-muted mb-0">
                    <a
                      className="text-decoration-none"
                      href={`tel:${user.phone}`}
                    >
                      {user.phone}
                    </a>
                  </p>
                </td>
                <td>
                  <button className="btn btn-primary mx-1">
                    <Pencil />
                  </button>
                  <button className="btn btn-danger mx-1">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WidthSpinner>
      {/* Modal for add a new user */}
      <UserAddModal />
    </div>
  );
};

export default Users;

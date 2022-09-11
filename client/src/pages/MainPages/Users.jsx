import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import useToast from "../../hooks/useToast";
import WidthSpinner from "../../components/WidthSpinner";
import { useHeaderAccessToken } from "../../hooks/useHeaderAccessToken";
import { PersonPlusFill, Pencil, Trash } from "react-bootstrap-icons";
import UserAddModal from "../../components/users-component/UserAddModal";
import { useSelector } from "react-redux";
import UserEditModal from "../../components/users-component/UserEditModal";

const Users = () => {
  const headerAccessToken = useHeaderAccessToken();
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { access_token } = useSelector((state) => state.user);
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get("/users/get-users", headerAccessToken);
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      useToast(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      const res = await axios(`/users/delete-user/${id}`, {
        method: "DELETE",
        headers: {
          access_token,
        },
      });
      useToast(res.data.message, true);
      await fetchAllUsers();
    } catch (error) {
      useToast(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="page">
      <WidthSpinner data={users}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Users</h1>{" "}
          <button
            className="btn btn-primary d-flex align-items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add User <PersonPlusFill style={{ marginLeft: 10, fontSize: 18 }} />
          </button>
        </div>
        <table className="table align-middle mb-0 bg-white">
          <thead className="bg-light">
            <tr style={{ backgroundColor: "#e9ecef" }}>
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
                  <button
                    className="btn btn-primary mx-1"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    <Pencil />
                  </button>
                  <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteUser(user._id)}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </WidthSpinner>
      {/* Modal for add a new user */}
      <UserAddModal
        fetchAllUsers={fetchAllUsers}
        isModalOpen={isAddModalOpen}
        setIsModalOpen={setIsAddModalOpen}
      />
      {/* Modal for edit user */}
      <UserEditModal
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
    </div>
  );
};

export default Users;

import React, { useState, useEffect } from "react";
import Modal from "../modal/Modal";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";
import axios from "axios";

const UserEditModal = ({
  setIsModalOpen,
  isModalOpen,
  userId,
  setUserId,
  fetchAllUsers,
}) => {
  const { access_token } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    position: "",
    phone: "",
    email: "",
  });

  const fetchUser = async () => {
    try {
      const { data } = await axios(`/users/get-user/${userId}`, {
        method: "GET",
        headers: {
          access_token,
        },
      });
      setUser(data);
    } catch (error) {
      useToast(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((res) => ({ ...res, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    await axios(`/users/update-user/${user._id}`, {
      method: "PUT",
      headers: {
        access_token,
      },
      data: user,
    });
    await fetchAllUsers();
  };

  useEffect(() => {
    if (isModalOpen && userId) {
      fetchUser();
    }
    return () => {
      setUserId(null);
      setUser({
        name: "",
        position: "",
        phone: "",
        email: "",
      });
    };
  }, [userId]);

  return (
    <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="userAddLabel">
            EDIT A USER
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setIsModalOpen(false)}
          ></button>
        </div>

        <form onSubmit={submitHandler}>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                User name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={user.name}
                onInput={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                User position
              </label>
              <input
                type="text"
                className="form-control"
                id="position"
                name="position"
                value={user.position}
                onInput={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                User phone number
              </label>
              <input
                type="phone"
                className="form-control"
                id="phone"
                name="phone"
                value={user.phone}
                onInput={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                User Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                aria-describedby="emailHelp"
                value={user.email}
                onInput={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UserEditModal;

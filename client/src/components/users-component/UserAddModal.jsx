import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useToast from "../../hooks/useToast";
import Modal from "../modal/Modal";
import { Keyboard, HandIndexThumb } from "react-bootstrap-icons";

const UserAddModal = ({ fetchAllUsers, isModalOpen, setIsModalOpen }) => {
  const [togglePosition, setTogglePosition] = useState(false);
  const { access_token } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    name: "",
    position: "Software engineer",
    phone: "",
    email: "",
    password: "",
  });

  const clearValues = () => {
    setUser({
      name: "",
      position: "Software engineer",
      phone: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((res) => ({ ...res, [name]: value }));
    console.log(user);
  };

  const handleTogglePosition = () => {
    setTogglePosition((prev) => !prev);
    setUser((prev) => ({
      ...prev,
      position: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    try {
      const res = await axios("/users/create-user", {
        method: "POST",
        headers: {
          access_token,
        },
        data: user,
      });
      useToast(res.data.message, true);
      await fetchAllUsers();
    } catch (error) {
      useToast(error.message);
    }
    clearValues();
  };
  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userAddLabel">
              ADD NEW USER
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setIsModalOpen(false)}
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
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
                  {togglePosition
                    ? "Type your position"
                    : "Select your position"}
                </label>
                <div className="d-flex">
                  {togglePosition ? (
                    <>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={user.position}
                        onChange={handleChange}
                      />
                    </>
                  ) : (
                    <>
                      <select
                        id="position"
                        name="position"
                        className="form-select"
                        onChange={handleChange}
                      >
                        <option value="Software engineer">
                          Software engineer
                        </option>
                        <option value="HR">HR</option>
                        <option value="Sales manager">Sales manager</option>
                      </select>
                    </>
                  )}
                  <button
                    className="btn ms-2 btn-primary"
                    onClick={handleTogglePosition}
                    type="button"
                  >
                    {togglePosition ? <HandIndexThumb /> : <Keyboard />}
                  </button>
                </div>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  User Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
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
      </div>
    </Modal>
  );
};

export default UserAddModal;

import React from "react";
import Modal from "../modal/Modal";

const UserEditModal = ({ setIsModalOpen, isModalOpen }) => {
  return (
    <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
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

        <form>
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Choose user postion
              </label>
              <select id="position" className="form-select">
                <option value="Software engineer">Software engineer</option>
                <option value="HR">HR</option>
                <option value="Sales manager">Sales manager</option>
              </select>
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

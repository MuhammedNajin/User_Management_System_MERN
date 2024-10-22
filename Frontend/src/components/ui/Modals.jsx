import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./EditForm.css";

function Modals(props) {
  const { show,
     handleClose, 
     tittle, 
     onAction, 
     user, 
     setDetails,
     } = props;
  console.log();
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{tittle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div class="form-group">
              <label for="name">Name</label>
              <input
              onChange={(e) => {
                setDetails({ ...user, name: e.target.value })
              }}
                type="text"
                id="name"
                name="name"
                value={user != null ? user.name : ""}
                placeholder="Enter name"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
               onChange={(e) => {
                setDetails({ ...user, email: e.target.value })
             }}
                type="email"
                id="email"
                name="email"
                value={user != null ? user.email : ""}
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
               onChange={(e) => {
                setDetails({ ...user, phone: e.target.value })
             }}
                type="tel"
                id="phone"
                name="phone"
                value={user != null ? user.phone : ""}
                placeholder="Enter phone number"
              />
            </div>
            <div class="form-group">
              <label for="phone">Password</label>
              <input
               onChange={(e) => {
                setDetails({ ...user, password: e.target.value })
             }}
                type="tel"
                id="phone"
                name="phone"
                placeholder="Create new password"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onAction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Modals;

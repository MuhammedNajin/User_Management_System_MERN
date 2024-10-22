import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin, logout } from '../../../redux/adminSlice'
import SweetAlert from 'sweetalert2'
import UserCard from "../card/UserCard";
import "bootstrap/dist/css/bootstrap.min.css";
import createAxios from "../../../axios/axios";
import { adminUrl } from "../../../data/urls";
import Modals from "../../ui/Modals";
import "./AdminHome.css";

function AdminHome() {
  console.log('SweetAlert', SweetAlert);
  const { token } = useSelector((state) => state.adminInfo);
  const axios = createAxios(adminUrl, token);
  const [state, setState] = useState([]);
  const [ searchQuery, setSearchQuery ] = useState('')
  const [userDetails, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [del, setDelete] = useState(false)
  const [showCreateModal, setCreateModal] = useState(false);
  const dispatch = useDispatch()
  const handleClose = () => setShow(false);
  const handleCloseCreateModal = () => setCreateModal(false);
  const handleShow = (e) => {
    const user = e.target.getAttribute("data-user");
    setDetails(JSON.parse(user));
    setShow(true);
  };

  const handleEditSubmit = (e) => {
    const data = {
      ...userDetails,
    };
    axios.put("/edit-user", data).then((response) => {
      if (response.status === 200) {
        setShow(false);
      } else if (response.status === 500) {
      }
    })
    .catch((err) => {
      console.log('errr', err.response.status)
      if(err.response.status === 403) {
        dispatch(logout())
      }
    })
  };

  function handleDelete(e) {
    const email = e.target.getAttribute('data-user');
    SweetAlert.fire({
      title: "Are you sure?",
      text: `Do you want to delete the user`,
      icon: "error"
    })
    .then((result) => {
      if(result.isConfirmed) {
         axios.delete(`/delete-user?email=${email}`)
         .then((res) => {
            if(res.status === 200) {
              console.log('success');
              setDelete(!del)
            }
         })
      }
    })
  }

  function handleCreateSubmit() {
    const data = {
      ...userDetails,
    };
    axios.post("/create-user", data).then((response) => {
      if (response.status === 201) {
        setCreateModal(false);
      }
    })
    .catch((err) => {
      console.log('errr', err.response.status)
      if(err.response.status === 403) {
        dispatch(logout())
      }
    })
  }

  function handleSearch(e) {
    e.preventDefault();
      axios.get(`/search-user?search=${searchQuery}`)
      .then((response) => {
         if(response.status === 200) {
          const { users } = response.data
          if (Array.isArray(users)) {
            console.log("hellod");
            setState(users);
          }
         }
      })
      .catch((err) => {
        console.log('errr', err.response.status)
        if(err.response.status === 403) {
          dispatch(logout())
        }
      })
  }

  useEffect(() => {
    axios.get("/home").then((response) => {
      const { user } = response.data;
      console.log(user, response.data);
      if (Array.isArray(user)) {
        console.log("hellod");
        setState(user);
      }
    })
    .catch((err) => {
      console.log('errr', err.response.status)
      if(err.response.status === 403) {
        dispatch(logout())
      }
    })
  }, [show, del]);
  return (
    <div className="containerfluid" style={{backgroundColor: '#e2e3e5'}} >
      <header>
        <nav>
          <div className="navbar">
            <div className="nav-item">
              <h1>logo</h1>
            </div>
            <div className="nav-item">
              <ul className="nav-list-item">
                <form class="d-flex" role="search">
                  <input
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }}
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button onClick={handleSearch} class="btn btn-dark" type="button">
                    Search
                  </button>
                </form>
              </ul>
            </div>
            <div className="nav-item">
              <button
              className="create-button"
                onClick={(e) => {
                  setCreateModal(true);
                }}
              >
                Create user
              </button>
              <button
              
                onClick={(e) => {
                   dispatch(logout());
                }}
                className="logout-button"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>
      <div className="body-container">
        <div className="container">
          <div className="row">
            <Modals
              show={show}
              tittle="Edit user"
              handleClose={handleClose}
              onAction={handleEditSubmit}
              user={userDetails}
              setDetails={setDetails}
            />
            <Modals
              show={showCreateModal}
              tittle="Edit user"
              handleClose={handleCloseCreateModal}
              onAction={handleCreateSubmit}
              user={userDetails}
              setDetails={setDetails}
            />
            {state.length != 0 ? (
              state.map((user) => {
                return (
                  <div className="col-3 mb-5">
                    <UserCard
                      url={user.image}
                      name={user.name}
                      email={user.email}
                      openEdit={handleShow}
                      openDelete={handleDelete}
                      user={user}
                    />
                  </div>
                );
              })
            ) : (
              <h1>helo</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;

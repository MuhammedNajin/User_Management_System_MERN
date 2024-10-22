import React from "react";
import './Navbar.css'
import Button from "../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { changeState } from "../../redux/userSlice";
import { NavLink } from "react-router-dom";
function Navbar() {
  const { isLogged } = useSelector((state) => state.userInfo);
  console.log('use', isLogged)
  const dispatch = useDispatch()
  return (
    <header>
      <nav>
        <div className="navbar">
          <div className="nav-item">
            <h1>logo</h1>
          </div>
          <div className="nav-item">
          {
            isLogged ? 
            <ul className="nav-list-item">
            <li><NavLink style={{color: 'wheat', textDecoration: 'none'}} to="/" className={({isActive}) => {
              return isActive ? "active" : ""
            }}>Home</NavLink></li>
            <li><NavLink  style={{color: 'wheat', textDecoration: 'none'}} to="/profile" className={({isActive}) => {
              return isActive ? "active" : ""
            }}>Profile</NavLink></li>
          </ul> :
          <></>
          }
          </div>
          <div className="nav-item">
            { 
              isLogged == true ? (<button onClick={(e) => {
                dispatch(changeState(null));
            }} className="logout-button">Logout</button>) :
              (<button className="logout-button">login</button>)
            }
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { logout } from "../../../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../../firebase/firestore";
import createAxios from "../../../axios/axios";
import { baseURL } from "../../../data/urls";
import { Skeleton } from "@mui/material";
import { Spinner } from "react-bootstrap";
import "./profile.css";




function Profile() {
  const [state, setState] = useState({});
  const [loading, changeLoadingState] = useState(false);
  const [profile, setProfile] = useState(null);
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const { token } = useSelector((state) => state.userInfo);
  const axios = createAxios(baseURL, token);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("_id", _id);
    axios.get(`/profile/${_id}`).then((res) => {
      const { user } = res.data;
      setProfile(user);
    })
    .catch((err) => {
      console.log('errr', err.response.status)
      if(err.response.status === 403) {
        console.log('error recived')
        dispatch(logout())
      }
    })
  }, [loading]);
  async function handler() {
    try {
      changeLoadingState(true);
      const storage = getStorage();
      const storageRef = ref(storage, `image/${state.file.name}`);
      const snapShot = await uploadBytes(storageRef, state.file);
      const url = await getDownloadURL(storageRef);
      console.log("url", url);
      const data = {
        url,
        id: _id,
      };
      const responce = await axios.post("/profile", data);
      if (responce.status === 201) {
        changeLoadingState(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="profile-container">
      <div className="profile">
        <div className="image-container">
          <div>
            {loading ? (
              <div className="spinner-container">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <img
                className="round-image"
                src={
                  profile != null
                    ? profile.image
                    : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAL8AAACUCAMAAAD1XwjBAAAAMFBMVEXk5ueutLfo6uursbTDyMqxt7rh4+TY29zb3t+2u77Lz9HU19nHy825vsGnrrG/xMZ3YekEAAAEo0lEQVR4nO2c2XLrIAyGjdjBwPu/7QFnOU7SJAZki8z4u+m0N/0FsiQWMU0nJycnJycndyCjjC6o8gu1niqydJ+CvMJkEF79jglgBOPsER7Z/Asm5JF3Nj6rv5pgXXYlaoUfAeNk/Ev8hSidGXgSlrF/r36xIM/BqAaAD/xPz3nwIh78mAbA/E37jXlEA9Q311k5kRzOADDfXWflRMxQC37Cbxe/IMf6CGrlMz6SAVAtv6CpZd8xLfJZpJZ9Q1V8uWv4GB4EtlV/opZegLlRfjZgphbf+u3e0NQuBCo0D/8IHgSuQ36OQY5Yv5Fd+hlXtPrnzUXbG/20tWhr6F8ZQCkfeoc/6xeEEwDd8kmzMDgM/Y7MALD98hkLVPrzmgtDv6RKwtsX7J+hciAIKPLJigiD4v6MW5rFPHiJop8xmqVwR+H/CFEEBYGln2YZoxKW/kRShBqc8JMJFPoBKfwUKAIQaKzwQ6S/a+H+AKfRj/T5Zv0UW4mI+qM/9ZPq/3H/ofF/vPhJE39+PP5PGi3/WpL6p2vndg0nqX+mCa3+FCT68ep/mk1ocDjyGSdaP2IFIEt1koq0/0D0+U6QcPRT7UCDxtk/JLtJACgfAE32WvRjRFDCAwxQGPv/hFeBMA4ALOUBnu6egEh7E6u3huOkwz9NvYswSu9f6CtCuSCW31kESerhzzmgZ/jpzk7/G9B6/WqE6zNT2YduHn5p6Ie/bAQ1JgGidcsLjQdhcQDnv9JSx0Xq0Lmi4SiMPPKvgeo0NpT8qX4pMI/WyAPupWfq/eCTXdn4APitiYzbQQLnI6DEpkQQxagdSOA3+BDZdaUNAMzykwmcSTdw/9q0tLAF9qZ/kLMwbvPaHVB+tvzZhPwHO/vx1RdgUtolGTM8U37K5PTovZvPKO3dLMTs/DidOjXACmot21nUqoL5z/L7NHob+aLceO+cSCFYWUIOX9oKrQ0pCee9NmpMI7Iqo4tuexH90j9++aMMSczeTGPZUNr1hZWSver+IwtwKW0apw87D/zcsAXBZdLkJuT/b8SbdPudGINXhP0voPQsW8VfJiHyVL4GCvFgXKrpWX5rghX6cAsAdLLbF1xfTJAH13UAPmCJv1iQ6+rj5gBMQDj3ejHhqDVxVo859nciP+IanxH7qF8sCH5fLyoPhOymnpXknPbckga8K2NvLZDzXlkZ4PVZnz2w+0wB9LbKbmaP+1gwbdnbQSIm7HQGTVv8zWDvMPZ1ubcYgJrNctw5Vn4BzwDQR325a9A6yzftyu4A0gEZeIQqv9EAhBkATSV/MaDXAhrfv9H9DYAhiDxr+qLQ4XH/lb5EdmjW/Qvec8ej83EWHANCu3yc9wU6ab/f2nEzCRPeeGA5gvcsNF6xHMJ7Fpo8COl1BwxajrwR23u7abpsg9UdhUL1BICmlrymYQLIM+8jtccc4wSfhVj5xMUwsf9G5StTOJ05iMS6OtTgb/D3wVONfrTWTDyqHAio1b5SdbjR/6wePhVFEOLTAnhUVKFdPRV7IbenMJx36ZCRFbe4Rov+Bbl9K8WMqL/i1Xp/vW40FBW7oUaMSMWpGAzJdv0nR/EPMkVDVWPQdZ0AAAAASUVORK5CYII="
                }
                alt=""
              />
            )}

            <div
              className="file-upload-container"
              style={{ marginTop: "10px" }}
            >
              <input
                id="file-input"
                onChange={(e) => {
                  setState({ file: e.target.files[0] });
                }}
                type="file"
              />
              <label htmlFor="file-input" className="file-label">
                Choose File
              </label>

              <button
                className="upload-button"
                onClick={(e) => {
                  handler();
                }}
              >
                upload
              </button>
            </div>
          </div>
        </div>
        <div className="profile-details">
          <div className="details">
            <div className="profile-item">
              {profile != null ? (
                <p>{profile.name}</p>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "200px" }}
                />
              )}
            </div>
            <div className="profile-item">
              {profile != null ? (
                <p>{profile.email}</p>
              ) : (
                <Skeleton
                  variant="text"
                  sx={{ fontSize: "1rem", width: "200px" }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

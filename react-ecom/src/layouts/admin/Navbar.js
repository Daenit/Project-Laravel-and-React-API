import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    alert('Logged out');
    navigate('/login'); // Redirect to login page
  };

  useEffect(() => {
      // Fetch all users
      axios.get("/api/users")
          .then((response) => {
              setUsers(response.data.users); // Store users in state
          })
          .catch((error) => {
              console.error("Error fetching users:", error);
          });
  }, []);

  return (
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav
            className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex"
          >
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="bi bi-search search-icon"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div>
          </nav>

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
            <li
              className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none"
            >
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                to="#"
                role="button"
                aria-expanded="false"
                aria-haspopup="true"
              >
                <i class="bi bi-search"></i>
              </Link>
              <ul className="dropdown-menu dropdown-search animated fadeIn">
                <form className="navbar-left navbar-form nav-search">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Search ..."
                      className="form-control"
                    />
                  </div>
                </form>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="messageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="bi bi-envelope-fill"></i>
              </Link>
              <ul
                className="dropdown-menu messages-notif-box animated fadeIn"
                aria-labelledby="messageDropdown"
              >
                <li>
                  <div
                    className="dropdown-title d-flex justify-content-between align-items-center"
                  >
                    Messages
                    <Link to="#" className="small">Mark all as read</Link>
                  </div>
                </li>
                <li>
                  <div className="message-notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/jm_denis.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jimmy Denis</span>
                          <span className="block"> How are you ? </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/chadengle.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Chad</span>
                          <span className="block"> Ok, Thanks ! </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/mlane.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Jhon Doe</span>
                          <span className="block">
                            Ready for the meeting today...
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </Link>
                      <Link to="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/talha.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="subject">Talha</span>
                          <span className="block"> Hi, Apa Kabar ? </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="see-all" to="javascript:void(0);"
                    >See all messages<i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="notifDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="bi bi-bell-fill"></i>
                <span className="notification">4</span>
              </Link>
              <ul
                className="dropdown-menu notif-box animated fadeIn"
                aria-labelledby="notifDropdown"
              >
                <li>
                  <div className="dropdown-title">
                    You have 4 new notification
                  </div>
                </li>
                <li>
                  <div className="notif-scroll scrollbar-outer">
                    <div className="notif-center">
                      <a to="#">
                        <div className="notif-icon notif-primary">
                          <i className="fa fa-user-plus"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> New user registered </span>
                          <span className="time">5 minutes ago</span>
                        </div>
                      </a>
                      <a to="#">
                        <div className="notif-icon notif-success">
                          <i className="fa fa-comment"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Rahmad commented on Admin
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a to="#">
                        <div className="notif-img">
                          <img
                            src="assets/img/profile2.jpg"
                            alt="Img Profile"
                          />
                        </div>
                        <div className="notif-content">
                          <span className="block">
                            Reza send messages to you
                          </span>
                          <span className="time">12 minutes ago</span>
                        </div>
                      </a>
                      <a to="#">
                        <div className="notif-icon notif-danger">
                          <i className="fa fa-heart"></i>
                        </div>
                        <div className="notif-content">
                          <span className="block"> Farrah liked Admin </span>
                          <span className="time">17 minutes ago</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </li>
                <li>
                  <Link className="see-all" to="javascript:void(0);"
                    >See all notifications<i className="fa fa-angle-right"></i>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item topbar-icon dropdown hidden-caret">
              <Link
                className="nav-link"
                data-bs-toggle="dropdown"
                to="#"
                aria-expanded="false"
              >
                <i class="bi bi-collection-fill"></i>
              </Link>
              <div className="dropdown-menu quick-actions animated fadeIn">
                <div className="quick-actions-header">
                  <span className="title mb-1">Quick Actions</span>
                  <span className="subtitle op-7">Shortcuts</span>
                </div>
                <div className="quick-actions-scroll scrollbar-outer">
                  <div className="quick-actions-items">
                    <div className="row m-0">
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-danger rounded-circle">
                          <i class="bi bi-calendar-check-fill"></i>
                          </div>
                          <span className="text">Calendar</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div
                            className="avatar-item bg-warning rounded-circle"
                          >
                            <i className="bi bi-map"></i>
                          </div>
                          <span className="text">Maps</span>
                        </div>
                      </Link>
                      <Link className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div className="avatar-item bg-info rounded-circle">
                            <i className="bi bi-file-excel"></i>
                          </div>
                          <span className="text">Reports</span>
                        </div>
                      </Link>
                      <a className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div
                            className="avatar-item bg-success rounded-circle"
                          >
                            <i className="bi bi-envelope"></i>
                          </div>
                          <span className="text">Emails</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div
                            className="avatar-item bg-primary rounded-circle"
                          >
                            <i class="bi bi-currency-dollar"></i>
                          </div>
                          <span className="text">Invoice</span>
                        </div>
                      </a>
                      <a className="col-6 col-md-4 p-0" to="#">
                        <div className="quick-actions-item">
                          <div
                            className="avatar-item bg-secondary rounded-circle"
                          >
                            <i className="bi bi-credit-card"></i>
                          </div>
                          <span className="text">Payments</span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item topbar-user dropdown hidden-caret">
              <Link
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                to="#"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src="assets/img/profile.jpg"
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username">
                  <span className="op-7">Hi,</span>
                  <span className="fw-bold">Danit</span>
                </span>
              </Link>
              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <div className="dropdown-user-scroll scrollbar-outer">
                {users.map((user) => (
                  <li key={user.id}>
                      <div className="user-box">
                          <div className="avatar-lg">
                              <img
                                  src="assets/img/profile.jpg"
                                  alt="profile"
                                  className="avatar-img rounded"
                              />
                          </div>
                          <div className="u-text">
                              <h4>{user.name}</h4> {/* Display user name */}
                              <p className="text-muted">{user.email}</p> {/* Display user email */}
                              <Link to={`/profile/${user.id}`} className="btn btn-xs btn-secondary btn-sm">
                                  View Profile
                              </Link>
                          </div>
                      </div>
                  </li>
              ))}
                  <li>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">My Profile</Link>
                    <Link className="dropdown-item" to="#">My Balance</Link>
                    <Link className="dropdown-item" to="#">Inbox</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">Account Setting</Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="#">Logout</Link>
                  </li>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;

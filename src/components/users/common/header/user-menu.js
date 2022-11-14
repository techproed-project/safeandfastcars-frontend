import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { logout } from "../../../../store/slices/auth-slice";
import { question } from "../../../../utils/functions/swal";

const UserMenu = () => {
  const { isUserLogin, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    question("Are you sure to logout?").then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        secureLocalStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <div className="user-menu">
      {isUserLogin ? (
        <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {user.firstName} {user.lastName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {user.roles.includes("Administrator") && (
              <Dropdown.Item as={Link} to="/admin">
                Admin Panel
              </Dropdown.Item>
            )}

            <Dropdown.Item as={Link} to="/user">
              Profile
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/user/reservations">
              Reservations
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <div>
          <Button variant="white" as={Link} to="/auth?type=login">
            Login
          </Button>
          <Button variant="primary" as={Link} to="/auth?type=register">
            Register
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

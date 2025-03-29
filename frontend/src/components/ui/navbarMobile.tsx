import { List, X } from "@phosphor-icons/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Plazomat.png";
import { Button } from "./button";

const NavbarMobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("user_id");
  const isAdmin = localStorage.getItem("is_admin");

  const navHandler = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className="flex p-4 justify-between">
        <img src={Logo} alt="" />

        <List
          onClick={navHandler}
          className={isNavOpen ? "hidden" : "bg-primary-700 rounded-md"}
          size={32}
          color="white"
        />
        <X
          onClick={navHandler}
          className={isNavOpen ? " bg-primary-700 rounded-md" : "hidden"}
          size={32}
          color="white"
        ></X>
      </div>
      <nav className={isNavOpen ? "" : "hidden"} onClick={closeNav}>
        <div className="flex flex-col justify-center items-center gap-4 bg-white p-4">
          <Link to="/">Homepage</Link>
          <Link to="/place/:id">Find a beach</Link>
          {isAdmin ? (
            <>
              <Link to="/beach-requests">Beach requests</Link>
            </>
          ) : (
            <></>
          )}
          <Button
            variant={"secondary"}
            onClick={() => {
              navigate("/add-beach");
            }}
          >
            Add new beach
          </Button>
          {isLoggedIn ? (
            <>
              <div>
                <Button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Log out
                </Button>
              </div>
            </>
          ) : (
            <>
              <div>
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobile;

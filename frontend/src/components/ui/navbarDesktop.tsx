import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import Plazomat from "../../assets/Plazomat.png";

const NavbarDesktop = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-3 w-full items-center ">
      <div>
        <img src={Plazomat} alt="" />
      </div>

      <div className="flex gap-6 p-2 items-center">
        <Link to="/">Homepage</Link>
        <Link to="/place/:id">Find a beach</Link>
        <Link to="/">About</Link>
        <div>
          <Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;

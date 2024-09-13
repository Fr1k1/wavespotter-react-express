import { Link } from "react-router-dom";
import { Button } from "./button";
import Plazomat from "../../assets/Plazomat.png";

const NavbarDesktop = () => {
  return (
    <div className="flex justify-between p-3 w-full items-center ">
      <div>
        <img src={Plazomat} alt="" />
      </div>

      <div className="flex gap-6 p-2 items-center">
        <Link to="/">Homepage</Link>
        <Link to="/">Find a beach</Link>
        <Link to="/">About</Link>
        <div>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;

import { Link, useNavigate } from "react-router-dom";
import { Button } from "./button";
import Logo from "../../assets/logo.png";
import { supabase } from "@/supabaseClient";
const NavbarDesktop = ({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between p-3 w-full items-center ">
      <div>
        <img src={Logo} alt="" />
      </div>

      <nav className="flex gap-6 p-2 items-center">
        <Link to="/">Homepage</Link>
        <Link to="/country/:id">Find a beach</Link>
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
                onClick={async () => {
                  await supabase.auth.signOut();
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
      </nav>
    </div>
  );
};

export default NavbarDesktop;

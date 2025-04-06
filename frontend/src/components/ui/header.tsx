import { useEffect, useState } from "react";
import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";

const Header = ({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) => {
  const [isDesktop, setDesktop] = useState(window.innerWidth >= 1024);

  const updateMedia = () => {
    setDesktop(window.innerWidth >= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  setTimeout(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div>
      {isDesktop ? (
        <NavbarDesktop isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      ) : (
        <NavbarMobile isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      )}
    </div>
  );
};

export default Header;

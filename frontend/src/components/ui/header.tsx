import { useEffect, useState } from "react";
import NavbarDesktop from "./navbarDesktop";
import NavbarMobile from "./navbarMobile";

const Header = () => {
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

  return <div>{isDesktop ? <NavbarDesktop /> : <NavbarMobile />}</div>;
};

export default Header;

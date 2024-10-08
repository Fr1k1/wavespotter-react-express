import Header from "./header";
import { Outlet, useLocation } from "react-router";
import Footer from "./footer";

const Layout = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen flex flex-col ">
      <Header />

      <div
        className={`  ${
          location.pathname === "/login" || location.pathname === "/register"
            ? "flex items-center justify-center flex-grow "
            : "flex-grow max-w-screen-2xl mx-auto w-full my-8 px-4 xl:px-0 "
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

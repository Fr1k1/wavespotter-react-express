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
          location.pathname === "/login"
            ? "flex items-center justify-center flex-grow"
            : "flex-grow max-w-screen-2xl mx-auto w-full"
        }`}
      >
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

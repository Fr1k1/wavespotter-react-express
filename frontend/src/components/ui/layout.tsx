import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./footer";

const Layout = () => {
  return (
    <main className="min-h-screen flex flex-col ">
      <Header />
      <div className="max-w-screen-2xl m-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./footer";

const Layout = () => {
  return (
    <main className="min-h-screen flex flex-col ">
      <Header />
      <div className="flex-grow max-w-screen-2xl mx-auto w-full">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;

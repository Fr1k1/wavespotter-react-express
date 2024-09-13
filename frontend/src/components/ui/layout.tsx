import Header from "./header";
import { Outlet } from "react-router";
import Footer from "./footer";

const Layout = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;

import { Link } from "react-router-dom";
import { FacebookLogo } from "@phosphor-icons/react";

const Footer = () => {
  return (
    <div className="bg-cyan-800 flex justify-center h-64">
      <div className="flex gap-6 flex-col max-w-7xl  justify-center">
        <div className="flex gap-10">
          <Link to="/" className="text-white p-4">
            About us
          </Link>
          <Link to="/" className="text-white p-4">
            Contact
          </Link>
          <Link to="/" className="text-white p-4">
            Contribute
          </Link>
          <Link to="/" className="text-white p-4">
            Add or edit beach
          </Link>
        </div>

        <div className="flex gap-6 justify-center">
          <FacebookLogo size={32} />
          <FacebookLogo size={32} />
          <FacebookLogo size={32} />
        </div>

        <div className="flex justify-center text-white">
          <p>Copyright 2024. All rights reserved by Martin Friščić</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

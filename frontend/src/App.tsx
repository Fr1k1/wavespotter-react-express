import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/ui/layout";
import Homepage from "./pages/Homepage";
import PlacePage from "./pages/PlacePage";
import Login from "./pages/Login";
import BeachDetails from "./pages/BeachDetails";
import AddNewBeach from "./pages/AddNewBeach";
import BeachRequests from "./pages/BeachRequests";
import ScrollToTop from "./components/ui/scrollToTop";
import AddReview from "./pages/AddBeachReview";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ui/protectedRoute";
import { useEffect, useState } from "react";
import ConfirmBeachRequest from "./pages/ConfirmBeachRequest";

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  originalSetItem.apply(this, [key, value]);
  const event = new Event("localStorageChange");
  window.dispatchEvent(event);
};

const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function (key) {
  originalRemoveItem.apply(this, [key]);
  const event = new Event("localStorageChange");
  window.dispatchEvent(event);
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user_id") ? true : false
  );

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("user_id") ? true : false;
      setIsLoggedIn(loggedInStatus);
    };

    window.addEventListener("localStorageChange", checkLoginStatus);

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("localStorageChange", checkLoginStatus);
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/beach/:id" element={<BeachDetails />} />
          <Route
            path="/add-beach"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isLoggedIn}>
                <AddNewBeach />
              </ProtectedRoute>
            }
          />
          <Route path="/beach-requests" element={<BeachRequests />} />
          <Route path="/beach-requests/:id" element={<ConfirmBeachRequest />} />

          <Route
            path="/beach/:id/add-review"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isLoggedIn}>
                <AddReview />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

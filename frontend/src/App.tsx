import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/ui/layout";
import Homepage from "./pages/Homepage";
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
import CountryPage from "./pages/CountryPage";
import { checkAuth } from "./common/globals";
import { supabase } from "./supabaseClient";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      await checkAuth(setIsLoggedIn, setIsAdmin);
      setIsLoading(false);
    };

    initAuth();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      checkAuth(setIsLoggedIn, setIsAdmin);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Layout isLoggedIn={isLoggedIn} isAdmin={isAdmin} />}
        >
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/country/:id" element={<CountryPage />} />
          <Route path="/beach/:id" element={<BeachDetails />} />
          <Route
            path="/add-beach"
            element={
              <ProtectedRoute redirectPath="/login" isAllowed={isLoggedIn}>
                <AddNewBeach />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beach-requests"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={isLoggedIn && isAdmin}
              >
                <BeachRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/beach-requests/:id"
            element={
              <ProtectedRoute
                redirectPath="/login"
                isAllowed={isLoggedIn && isAdmin}
              >
                <ConfirmBeachRequest />
              </ProtectedRoute>
            }
          />
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

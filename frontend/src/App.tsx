import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/ui/layout";
import Homepage from "./pages/Homepage";
import PlacePage from "./pages/PlacePage";
import Login from "./pages/Login";
import BeachDetails from "./pages/BeachDetails";
import AddNewBeach from "./pages/AddNewBeach";
import BeachRequests from "./pages/BeachRequests";
import ScrollToTop from "./components/ui/ScrollToTop";
import AddReview from "./pages/AddBeachReview";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/beach/:id" element={<BeachDetails />} />
          <Route path="/add-beach" element={<AddNewBeach />} />
          <Route path="/beach-requests" element={<BeachRequests />} />
          <Route path="/beach/:id/add-review" element={<AddReview />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

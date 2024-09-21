import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/ui/layout";
import Homepage from "./pages/Homepage";
import PlacePage from "./pages/PlacePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/place/:id" element={<PlacePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

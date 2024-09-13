import { Route, Routes } from "react-router";
import "./App.css";

import Layout from "./components/ui/layout";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

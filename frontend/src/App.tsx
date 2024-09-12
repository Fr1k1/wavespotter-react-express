import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <h2 className="text-red-500 text-2xl">Homepage</h2>
      <Button
        onClick={() => {
          console.log("Button clicked");
        }}
      >
        Click me
      </Button>
    </>
  );
}

export default App;

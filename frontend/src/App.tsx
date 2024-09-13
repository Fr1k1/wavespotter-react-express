import "./App.css";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

function App() {
  return (
    <>
      <h2 className="text-red-500 text-2xl">Homepage</h2>

      <div className="flex gap-6">
        <Button
          onClick={() => {
            console.log("Button clicked");
          }}
          variant={"secondary"}
          underlined
        >
          Click me
        </Button>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
        <Switch />
      </div>
    </>
  );
}

export default App;

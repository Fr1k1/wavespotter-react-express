import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <Card className="w-96 flex flex-col gap-6">
        <CardHeader>
          <CardTitle className="text-primary-800 text-3xl">Login</CardTitle>
          <CardDescription>if you already have an acount</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="Email" />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input id="password" placeholder="password" />
              </div>
            </div>
          </form>

          <CardDescription>
            or{" "}
            <Link to="/register">
              {" "}
              <span className="underline text-secondary"> sign up </span>{" "}
            </Link>{" "}
            to create an account
          </CardDescription>
        </CardContent>
        <CardFooter className="flex w-full">
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

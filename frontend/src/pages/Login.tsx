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
import { notifyFailure } from "@/components/ui/toast";
import { supabase } from "@/supaBaseClient";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: authUser, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      notifyFailure("Something went wrong");
      return;
    }

    if (authUser) {
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("is_admin, username, first_name, last_name")
        .eq("id", authUser.user.id)
        .single();
      if (userError) {
        return;
      }

      localStorage.setItem("is_admin", userData?.is_admin);
      navigate("/");
    }
  };
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
                <Input
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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
          <Button
            className="w-full"
            variant={"darker"}
            type="submit"
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

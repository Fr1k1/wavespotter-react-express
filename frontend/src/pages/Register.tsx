import { useState } from "react";
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
import { supabase } from "../supaBaseClient";
import { notifyFailure, notifySuccess } from "@/components/ui/Toast";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          username: username,
        },
      },
    });

    if (error) {
      notifyFailure("Something went wrong");
      return;
    }

    if (authUser) {
      const { error: insertError } = await supabase.from("users").insert([
        {
          id: authUser?.user?.id,
          username,
          email,
          first_name: firstName,
          last_name: lastName,
          is_admin: false,
        },
      ]);

      if (insertError) {
        return;
      }

      notifySuccess("Successfull registration");
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div>
      <Card className="w-96 flex flex-col gap-6">
        <CardHeader>
          <CardTitle className="text-primary-800 text-3xl">Register</CardTitle>
          <CardDescription>if you don't have an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input
                  id="first_name"
                  placeholder="First name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="last_name"
                  placeholder="Last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  id="username"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </form>

          <CardDescription>
            or{" "}
            <Link to="/login">
              <span className="underline text-secondary"> sign in </span>
            </Link>{" "}
            if you already have an account
          </CardDescription>
        </CardContent>
        <CardFooter className="flex w-full">
          <Button
            className="w-full"
            variant={"darker"}
            type="submit"
            onClick={handleRegister}
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;

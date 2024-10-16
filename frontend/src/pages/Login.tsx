import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { notifyFailure } from "@/components/ui/toast";
import { supabase } from "@/supabaseClient";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormFieldCustom from "@/components/ui/formFieldCustom";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
});

const Login = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: z.infer<typeof formSchema>) => {
    const { email, password } = data;
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
        .select("is_admin, username, first_name, last_name,id")
        .eq("id", authUser.user.id)
        .single();

      console.log("Response korisnika je: ", userData);
      if (userError) {
        return;
      }

      localStorage.setItem("is_admin", userData?.is_admin);
      localStorage.setItem("user_id", userData?.id);

      navigate("/");
    }
  };

  return (
    <div>
      <Card className="w-96 flex flex-col gap-6">
        <CardHeader>
          <CardTitle className="text-primary-800 text-3xl">Login</CardTitle>
          <CardDescription>If you already have an account</CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="mb-4"
              id="form"
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormFieldCustom
                    name="email"
                    placeholder="Email"
                    form={form}
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <FormFieldCustom
                    name="password"
                    placeholder="Password"
                    form={form}
                  />
                </div>
              </div>
            </form>
          </FormProvider>

          <CardDescription>
            Or{" "}
            <Link to="/register">
              <span className="underline text-secondary">sign up</span>
            </Link>{" "}
            to create an account
          </CardDescription>
        </CardContent>
        <CardFooter className="flex w-full">
          <Button
            className="w-full"
            variant={"darker"}
            type="submit"
            form="form"
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;

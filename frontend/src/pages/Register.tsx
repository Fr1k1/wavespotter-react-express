import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { notifyFailure, notifySuccess } from "@/components/ui/toast";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldCustom from "@/components/ui/formFieldCustom";

const formSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(50, {
      message: "First name must not exceed 50 characters",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(50, {
      message: "Last name must not exceed 50 characters",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not exceed 30 characters",
    }),
  email: z
    .string()
    .email({
      message: "Invalid email address.",
    })
    .max(80, {
      message: "Email must not exceed 80 characters",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Register = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const handleRegister = async (data: z.infer<typeof formSchema>) => {
    const { email, password, first_name, last_name, username } = data;

    const { data: authUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          username,
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
          first_name,
          last_name,
          is_admin: false,
        },
      ]);

      if (insertError) {
        return;
      }

      notifySuccess("Successful registration");
      navigate("/login");
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
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(handleRegister)}
              className="mb-4"
              id="form"
            >
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <FormFieldCustom
                    name="first_name"
                    placeholder="First Name"
                    form={form}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormFieldCustom
                    name="last_name"
                    placeholder="Last Name"
                    form={form}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <FormFieldCustom
                    name="username"
                    placeholder="Username"
                    form={form}
                  />
                </div>
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
            form="form"
          >
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;

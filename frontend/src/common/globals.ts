import { supabase } from "@/supabaseClient";
import { UseFormReturn } from "react-hook-form";

export const checkAuth = async (
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setIsLoggedIn(!!user);

    if (user) {
      const { data } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      setIsAdmin(data?.is_admin || false);
    } else {
      setIsAdmin(false);
    }
  } catch (error) {
    console.error("Error checking authentication:", error);
    setIsLoggedIn(false);
    setIsAdmin(false);
  }
};

export const getUserId = async (
  setUserId: React.Dispatch<React.SetStateAction<string>>,
  form: UseFormReturn
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    setUserId(user.id);
    form.setValue("userId", user.id);
  }
};

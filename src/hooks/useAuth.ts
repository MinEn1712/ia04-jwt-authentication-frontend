import { useNavigate } from "@tanstack/react-router";
import { AuthInfo, signIn, signUp } from "../api/services/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { c } from "node_modules/vite/dist/node/types.d-aGj9QkWt";

export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Account created successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate({ to: "/login" });
    },
    onError: (error: any) => {
      toast.error(error.response.data.error, {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
};

export const useSignIn = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signIn,
    onSuccess: (response: AuthInfo) => {
      setAccessToken(response.accessToken);
      toast.success("User signed in", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate({ to: "/" });
    },
    onError: (error: any) => {
      toast.error("Error signing in", {
        position: "top-right",
        autoClose: 3000,
      });
    },
  });
};

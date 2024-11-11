import { signIn } from "@/api/services/auth";
import { useNavigate } from "@tanstack/react-router";
import { useContext, createContext, useState } from "react";
import { toast } from "react-toastify";

const AuthContext = createContext<any>(null);

const AuthProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const navigate = useNavigate();
  const loginAction = async (data: any) => {
    try {
      const response = await signIn(data);
      if (response) {
        setToken(response.accessToken);
        localStorage.setItem("accessToken", response.accessToken);
        toast.success("Login successful", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate({
          to: "/",
        });
        return;
      }
    } catch (err) {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 3000,
      });
      throw new Error("Invalid credentials");
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("accessToken");
    navigate({ to: "/login" });
  };

  return (
    <AuthContext.Provider value={{ token, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};

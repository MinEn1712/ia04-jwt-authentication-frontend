import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Button } from "@/components/ui/button";
import AuthProvider, { useAuth } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function NavBar() {
  const auth = useAuth();

  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <div className="px-4">
      <div className="p-2 flex justify-between gap-2 text-lg">
        <div className="flex gap-2">
          <Link to="/" activeOptions={{ exact: true }} className="font-bold">
            IA04
          </Link>
        </div>
        <div className="flex gap-2">
          {auth?.token ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <>
              <Link
                to="/login"
                activeProps={{
                  className: "font-bold",
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                activeProps={{
                  className: "font-bold",
                }}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <hr />
      <Outlet />
      <ToastContainer />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <NavBar />
    </AuthProvider>
  );
}

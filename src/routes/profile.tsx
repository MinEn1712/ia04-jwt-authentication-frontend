import { getUserInfo } from "@/api/services/user";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: !!auth.token,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {auth?.token ? (
        <div className="w-full h-[600px] flex flex-col justify-center items-center gap-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <div>
            <p>
              <b>Your username: </b>
              {data?.username}
            </p>
            <p>
              <b>Your email:</b> {data?.email}
            </p>
          </div>
          <Button
            onClick={() => {
              navigate({ to: "/" });
            }}
          >
            Back
          </Button>
        </div>
      ) : (
        <div className="w-full h-[600px] flex flex-col justify-center items-center gap-4">
          <h1 className="text-2xl font-bold">
            Please login to access this page :c
          </h1>
          <div className="flex gap-2">
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

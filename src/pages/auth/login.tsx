import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    toast({
      title: "Logging In",
      description: "Please Wait",
    });
    try {
      const res = await signIn("credentials", {
        email_id: username,
        password: password,
        redirect: false,
        callbackUrl: "/",
      });
      console.log(res);
      if (res?.status == 200) {
        toast({
          title: "Login Successful",
          description: "You are logged in successfully",
        });
        router.push("/");
        return;
      }
      toast({
        variant: "destructive",
        title: "Login unsuccesfull",
        description: "Please check your credentials",
      });
    } catch (err: any) {
      setError(err.response);
    }
  };

  return (
    <>
      <div className="flex h-[93.5vh] items-center justify-center bg-white ">
        <form
          onSubmit={handleSubmit}
          className="flex h-72 w-72 flex-col justify-center space-y-10 border-2 border-black p-4"
        >
          <input
            className="border-b-2 border-black outline-none"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e: any) => setUsername(e.target.value)}
          />
          <input
            className="border-b-2 border-black outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="h-10 border-2 border-black p-1 hover:bg-black hover:font-bold hover:text-white"
          >
            Log In
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};
export default Login;

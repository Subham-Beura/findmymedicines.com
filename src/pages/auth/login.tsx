import { useState } from "react";
import { signIn } from "next-auth/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email_id: username,
        password: password,
        redirect: false,
        callbackUrl: "/",
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

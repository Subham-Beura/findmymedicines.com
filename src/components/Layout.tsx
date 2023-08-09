import Link from "next/link";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session);

  let isHome = false;
  let isAuth = false;
  router.pathname == "/" && (isHome = true);
  router.pathname == "/auth/login" && (isAuth = true);
  router.pathname == "/signup" && (isAuth = true);

  if (isHome)
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );

  if (session?.user || isAuth)
    return (
      <>
        <Navbar />
        <main className="pt-[10vh]">{children}</main>
        {!isHome && <Footer />}
      </>
    );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-[10vh]">
        <div className="flex h-[50vh] flex-col items-center justify-center bg-gray-900 text-white">
          <h1 className="text-8xl">Not Authorized</h1>
          <Link href="/auth/login">
            <h3 className="mt-3 text-2xl hover:underline">Please Sign In</h3>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signOut, useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <main
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      Find My Medicines
      {session?.user ? (
        <div>
          Welcome {session?.user.first_name}!
          <Button
            asChild
            variant={"link"}
            onClick={() => {
              signOut({
                redirect: false,
              });
              toast({ title: "Signed Out" });
            }}
          >
            <Link href={"#"}>Sign Out</Link>
          </Button>
        </div>
      ) : (
        <Button asChild>
          <Link href="/auth/login">Sign In</Link>
        </Button>
      )}
    </main>
  );
}

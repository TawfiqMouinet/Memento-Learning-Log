"use client";
import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);

  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") setIsLogged(true);
    else if (event == "SIGNED_OUT") setIsLogged(false);
  });

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("/");
  };

  const checkLogged = () => {
    if (user == null) {
      if (pathname.includes("home")) router.replace("/");
    }
  };

  useEffect(() => {
    async function fetchUser() {
      const user_prom = await supabase.auth.getUser();
      setUser(user_prom.data.user);
    }
    fetchUser();
    checkLogged();
  }, [isLogged]);

  return (
    <header className="flex mb-5 justify-between px-2 py-5">
      <Link href="../" className="flex pl-2 text-2xl font-break text-white">
        <GiBrain className="text-3xl mr-2" />
        Memento
      </Link>
      <ul className="flex">
        {user == null && (
          <Link href="/login">
            <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
              Log-in
            </li>
          </Link>
        )}

        {user == null && (
          <Link href="/signup">
            <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-2 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
              Register
            </li>
          </Link>
        )}

        {user != null && (
          <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </header>
  );
}

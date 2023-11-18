"use client";
import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace("../");
  };
  const [isLogged, setIsLogged] = useState(false);
  supabase.auth.onAuthStateChange((event, session) => {
    if (event == "SIGNED_IN") setIsLogged(true);
    else if (event == "SIGNED_OUT") setIsLogged(false);
  });

  return (
    <header className="flex mb-5 justify-between px-2 py-5">
      <Link href="../" className="flex pl-2 text-2xl font-break text-white">
        <GiBrain className="text-3xl mr-2" />
        Learning Log
      </Link>
      <ul className="flex">
        {!isLogged && (
          <Link href="/login">
            <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
              Log-in
            </li>
          </Link>
        )}

        {!isLogged && (
          <Link href="/signup">
            <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-2 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
              Register
            </li>
          </Link>
        )}

        {isLogged && (
          <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </header>
  );
}

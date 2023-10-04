"use client";
import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

export default function Header() {
  const supabase = createClientComponentClient();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
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
        <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
          <Link href="/login">Log-in</Link>
        </li>
        <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-2 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
          <Link href="/signup">Register</Link>
        </li>
        {isLogged && (
          <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        )}
      </ul>
    </header>
  );
}

"use client";
import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const handleSign = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: name,
        },
      },
    });
  };
  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-950 h-screen text-black">
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
        </ul>
      </header>
      <div className="bg-gray-300 mx-64  flex flex-col items-center justify-center text-black rounded-3xl space-y-4">
        <h1 className="text-2xl  pl-3">Create your account:</h1>
        <form className="flex flex-col space-y-4 ">
          <label htmlFor="email" className="pt-4 ml-5">
            Email:
          </label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className=" rounded-xl"
          />
          <label htmlFor="password" className="pl-1">
            Password:
          </label>
          <input
            type="text"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className=" rounded-xl"
          />
          <label htmlFor="fullname" className="pl-1">
            Full Name:
          </label>
          <input
            type="text"
            name="fullname"
            onChange={(e) => setName(e.target.value)}
            className=" rounded-xl"
          />
          <button type="button" onClick={handleSign}>
            Register
          </button>
        </form>
      </div>
    </main>
  );
}

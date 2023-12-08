"use client";
import Loading from "./loading";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Suspense, useState } from "react";
import { useRouter } from "next/navigation";
library.add(faEye, faEyeSlash);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  supabase.auth.onAuthStateChange((event) => {
    if (event == "SIGNED_IN") setIsLogged(true);
    else if (event == "SIGNED_OUT") setIsLogged(false);
  });

  if (isLogged) {
    router.push("./home");
  }

  const handleLogIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  };

  return (
    <main className="text-black flex flex-col m-auto mt-20 items-center">
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-300 w-96 h-80 text-black flex flex-col justify-center items-center rounded-3xl space-x-2 space-y-4 pt-5 pb-8">
          <h1 className="text-2xl pl-3">Login to your account:</h1>
          <div className="flex flex-col space-y-4">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="pl-1 rounded-xl bg-white"
              />
            </div>
            <label htmlFor="password" className="block">
              Password:
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="pl-1 rounded-xl bg-white"
              />
              <FontAwesomeIcon
                icon={show ? "eye-slash" : "eye"}
                className="scale-110 inline absolute left-48 inset-y-1 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            </div>
            <button
              type="button"
              onClick={handleLogIn}
              className="text-xl w-40 self-center rounded-3xl bg-black text-white py-3 transition-all hover:bg-white hover:translate-y-1 hover:scale-105 hover:text-black duration-500 "
            >
              Login
            </button>
          </div>
        </div>
      </Suspense>
    </main>
  );
}

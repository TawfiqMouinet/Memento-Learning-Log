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
  supabase.auth.onAuthStateChange((event, session) => {
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
    <main className="text-black flex flex-col my-auto items-center">
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-300 w-5/12 text-black rounded-3xl space-x-2 space-y-4 pt-5 pb-8">
          <h1 className="text-2xl pl-3">Login to your account:</h1>
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="pl-1 rounded-xl"
          />
          <label htmlFor="password" className="block">
            Password:
          </label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-1 rounded-xl"
            />
            <FontAwesomeIcon
              icon={show ? "eye-slash" : "eye"}
              className="scale-110 inline absolute left-48 inset-y-1 cursor-pointer"
              onClick={() => setShow(!show)}
            />
          </div>
          <button type="button" onClick={handleLogIn}>
            Login
          </button>
        </div>
      </Suspense>
    </main>
  );
}

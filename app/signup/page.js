"use client";
import { Suspense, useState } from "react";
import Loading from "./loading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
library.add(faEye, faEyeSlash);

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const handleSign = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}`,
        data: {
          full_name: name,
        },
      },
    });
    console.log(name);
    router.refresh();
  };

  return (
    <main className="text-black flex flex_col justify-center">
      <Suspense fallback={<Loading />}>
        <div className="bg-gray-300 mx-64 w-96 h-96 flex flex-col items-center justify-center text-black rounded-3xl space-y-4">
          <h1 className="text-2xl  pl-3">Create your account:</h1>
          <form className="flex flex-col space-y-4 ">
            <label htmlFor="email" className="pt-4">
              Email:
            </label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-1 rounded-xl bg-white"
            />
            <label htmlFor="password" className="">
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
                className="scale-110 inline absolute right-1 inset-y-1 cursor-pointer"
                onClick={() => setShow(!show)}
              />
            </div>
            <label htmlFor="fullname" className="">
              Full Name:
            </label>
            <input
              type="text"
              name="fullname"
              onChange={(e) => setName(e.target.value)}
              className="pl-1 rounded-xl bg-white"
            />
            <button
              type="button"
              onClick={handleSign}
              className="text-xl rounded-3xl bg-black text-white py-2 transition-all hover:bg-white hover:translate-y-1 hover:scale-105 hover:text-black duration-500 "
            >
              Register
            </button>
          </form>
        </div>
      </Suspense>
    </main>
  );
}

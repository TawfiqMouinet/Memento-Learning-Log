import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-950 h-screen text-black">
      <header className="flex mb-5 justify-between px-2 py-5">
        <h1 className="flex pl-2 text-2xl font-break text-white">
          <GiBrain className="text-3xl mr-2" />
          Learning Log
        </h1>
        <ul className="flex">
          <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-3 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
            <Link href="/login">Log-in</Link>
          </li>
          <li className="bg-pale-slate mx-2 text-white rounded-2xl py-2 px-2 transition-all hover:translate-y-1 hover:scale-110 hover:bg-slate-50 hover:text-black duration 500">
            <Link href="/signup">Register</Link>
          </li>
        </ul>
      </header>
      <section className="border flex-col bg-gray-300 mx-10 pb-5 rounded-xl">
        <h1 className=" text-6xl pt-8 pb-6 pl-5 pr-12">Track your learning.</h1>
        <p className="text-2xl pb-5 pl-10 pr-5 ">
          Make your own learning log, and keep a list of the topics you're
          learning about. Whenever you learn something new about a topic, make
          an entry summarizing what you've learned!{"\n"}
        </p>
        <Link href="/signup">
          <button className="relative text-xl rounded-2xl bg-black text-white ml-10 pl-5 pr-8 py-3 transition-all hover:bg-slate-100 hover:translate-y-1 hover:scale-105 hover:text-black duration-500 ">
            Begin!{" "}
            <BsFillArrowRightCircleFill className="absolute right-2 bottom-4" />{" "}
          </button>
        </Link>
      </section>
    </main>
  );
}

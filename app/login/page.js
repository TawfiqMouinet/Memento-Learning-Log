import Link from "next/link";
import { GiBrain } from "react-icons/gi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Home() {
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
      <div className="bg-gray-300 mx-64 text-black rounded-3xl">
        <h1 className="text-2xl pl-3">Login to your account:</h1>
      </div>
    </main>
  );
}

import Link from "next/link";
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export default function Landing() {
  return (
    <main className="bg-inherit text-black">
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

import Header from "../components/header";
import Loading from "./loading";

export default function Login() {
  return (
    <main className="bg-gradient-to-b from-slate-800 to-slate-950 h-screen text-black">
      <Header />
      <div className="bg-gray-300 mx-64 text-black rounded-3xl">
        <h1 className="text-2xl pl-3">Login to your account:</h1>
      </div>
    </main>
  );
}

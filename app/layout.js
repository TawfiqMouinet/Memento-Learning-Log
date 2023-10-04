import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gradient-to-b from-slate-800 to-slate-950 h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

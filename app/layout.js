import "./globals.css";
import { Inter } from "next/font/google";
import Header from "./components/header";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <div className="bg-gradient-to-b from-slate-800 to-slate-950 h-screen">
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

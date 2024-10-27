import { Toaster } from "react-hot-toast";
import "./globals.css";
import { Navbar, Provider } from "@/components";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata = {
  title: "Promptopia",
  description: "Descubra e compartilhe prompts de IA",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Toaster />
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Navbar />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
        </Provider>
      </body>
    </html>
  );
}

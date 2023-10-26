import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.min.css";
import { Header } from "../components/Header";
import { ServerCookieProvider } from "@/cookie/ServerCookieProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const serverCookieProvider = new ServerCookieProvider();
  // const accessToken = serverCookieProvider.get("accessToken");
  // console.log({ accessToken });
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}

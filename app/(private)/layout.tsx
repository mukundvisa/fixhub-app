import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Code Fixhub",
  description: "Developer store important code here",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

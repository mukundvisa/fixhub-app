import type { Metadata } from "next";
import "../globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Code Fixhub",
  description: "Developer store important code here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <AuthGuard>{children}</AuthGuard>
      <Footer />
    </>
  );
}

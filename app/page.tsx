"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/navbar";
import { Hero } from "../components/marketing/Hero";
import { Services } from "../components/marketing/Services";
import { Platform } from "../components/marketing/Platform";
import { FAQ } from "../components/marketing/FAQ";
import { Footer } from "../components/marketing/Footer";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("mock_current_user");
    if (user) {
      router.push("/dashboard");
      return;
    }
  }, [router]);

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Hero />
      <Services />
      <Platform />
      <FAQ />
      <Footer />
    </main>
  );
}


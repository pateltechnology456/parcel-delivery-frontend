"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EstimateForm } from "../components/estimate-form";
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

    if (typeof window !== "undefined" && window.innerWidth <= 768) {
      router.push("/login");
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (link && link.hash) {
        if (['#contact', '#about', '#how-it-works'].includes(link.hash)) {
          e.preventDefault();
          window.alert(`The ${link.hash.substring(1)} section is coming soon!`);
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [router]);

  return (
    <main>
      <Navbar />
      <EstimateForm />
      <Hero />
      <Services />
      <Platform />
      <FAQ />
      <Footer />
    </main>
  );
}

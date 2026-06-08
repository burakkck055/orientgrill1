import Navigation from "@/app/components/Navigation";
import Hero from "@/app/components/Hero";
import CategoryNav from "@/app/components/CategoryNav";
import BestSellers from "@/app/components/BestSellers";
import Menu from "@/app/components/Menu";
import Reviews from "@/app/components/Reviews";
import Contact from "@/app/components/Contact";
import Footer from "@/app/components/Footer";
import FloatingButtons from "@/app/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <CategoryNav />
        <BestSellers />
        <Menu />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}

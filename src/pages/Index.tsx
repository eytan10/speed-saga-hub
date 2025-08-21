import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Categories from "@/components/Categories";
import NewsPreview from "@/components/NewsPreview";
import Footer from "@/components/Footer";
import FloatingActionButton from "@/components/FloatingActionButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCars />
        <Categories />
        <NewsPreview />
      </main>
      <Footer />
      <FloatingActionButton />
    </div>
  );
};

export default Index;

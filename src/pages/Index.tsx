import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Categories from "@/components/Categories";
import NewsPreview from "@/components/NewsPreview";
import Footer from "@/components/Footer";
import CarDataUpdater from "@/components/CarDataUpdater";


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCars />
        <Categories />
        
        {/* Car Data Updater - Admin Section */}
        <section className="py-16 bg-secondary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              מרכז עדכון נתוני רכבים
            </h2>
            <div className="max-w-4xl mx-auto">
              <CarDataUpdater />
            </div>
          </div>
        </section>
        
        <NewsPreview />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { AuthProvider } from "./components/AuthContext";
import Chatbot from "./components/Chatbot";
import Index from "./pages/Index";
import CarsPage from "./pages/CarsPage";
import ReviewsPage from "./pages/ReviewsPage";
import NewsPage from "./pages/NewsPage";
import CommunityPage from "./pages/CommunityPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import BrandPage from "./pages/BrandPage";
import CategoryPage from "./pages/CategoryPage";
import FavoritesPage from "./pages/FavoritesPage";
import PricesPage from "./pages/PricesPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <FavoritesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/brand/:brand" element={<BrandPage />} />
              <Route path="/car/:brand/:model" element={<CarDetailsPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/prices" element={<PricesPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Chatbot />
          </BrowserRouter>
        </FavoritesProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

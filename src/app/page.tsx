import DiscoverWebsite from "./components/Discover/DiscoverPage";
import HeroPage from "./components/Hero/HeroPage";
import FavoritesSection from "./components/MonthlyFav/MonthlyFav";
import TrendsSection from "./components/Trend/TrendPage";
import TwitchPage from "./components/TwitchPage/TwitchPage";

export default function Home() {
  return (
    <div>
      <HeroPage />
      <TwitchPage />
      <TrendsSection />
      <FavoritesSection />
      <DiscoverWebsite />
    </div>
  );
}

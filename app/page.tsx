import SmoothScroll from "./providers/SmoothScroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import ContentCarousel from "./components/sections/ContentCarousel";
import Memberships from "./components/sections/Memberships";
import VideoFeatures from "./components/sections/VideoFeatures";
import AppGuides from "./components/sections/AppGuides";
import FindAClub from "./components/sections/FindAClub";

export default function Home() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <Memberships />
        <ContentCarousel />
        <VideoFeatures />
        <AppGuides />
        <FindAClub />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

import FAQSection from "../components/Landing/FAQSection";
import Featured from "../components/Landing/Featured";
import HowItWorks from "../components/Landing/HowItWorks";
import SearchBar from "../components/Landing/SearchBar";
import Slider from "../components/Landing/Slider";

export const LandingPage = () => {
  return (
    <div>
      <Slider />
      <HowItWorks />
      <SearchBar />
      <Featured />
      <FAQSection />
    </div>
  );
};

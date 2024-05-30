import Featured from "../components/Landing/Featured";
import SearchBar from "../components/Landing/SearchBar";
import Slider from "../components/Landing/Slider";

export const LandingPage = () => {
  return (
    <div>
      <Slider />
      <SearchBar />
      <Featured />
    </div>
  );
};

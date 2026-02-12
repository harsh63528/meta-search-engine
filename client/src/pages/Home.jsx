import Navbar from "../components/layout/Navbar.jsx";
import SearchBar from "../components/search/SearchBar.jsx";


export default function Home() {
  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-5xl font-bold mb-8">
          Meta Search Engine
        </h1>

        <SearchBar />
      </div>
    </div>
  );
}


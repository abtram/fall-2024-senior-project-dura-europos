import React from "react";
import dynamic from "next/dynamic";
import SearchResultsModal from "@/components/molecules/SearchResultsModal"; // Import the new component
import { LocationObject } from "@/types";
import SideMenu from "@/components/molecules/SideMenu"; // Import the new SideMenu component


const LandingView = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<LocationObject[]>([]);
  const [noResults, setNoResults] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);


  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNoResults(false); // Reset the "no results" state before each new search

    if (searchQuery.trim() !== "") {
      try {
        const response = await fetch(`http://localhost:8000/search?query=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();

          if (data.length === 0) {
            setNoResults(true); // No results found
          } else {
            setSearchResults(data); // Store the search results
            setIsModalOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };
  

  const DuraInteractive = React.useMemo(
    () =>
      dynamic(() => import("@/components/organisms/DuraInteractive"), {
        ssr: false, // Disable server-side rendering
        loading: () => (
          <div className="w-[800px] h-[500px] flex justify-center items-center border">
            <p className="text-lg">The map is loading...</p>
          </div>
        ),
      }),
    []
  );
  

  // Dummy search function ( will later replace this with an API call)
  const searchArtifacts = (query: string) => {
    console.log(`Searching all artifacts for "${query}"...`);
    //  integrate the API search call here
    //  Call an API route with search query to get search results
  };

  return (
    <div className="relative"> 
      <SideMenu /> 
      <div className="bg-yellow-300/50 rounded-xl ml-32 w-[93%] max-w-[1200px] mx-auto mt-10">
    <div className="flex flex-col gap-10 items-center p-10">
    <div className="text-center text-4xl text-black tracking-wide">
      Welcome to the Dura-Europos Archaeological Site
    </div>
    <form onSubmit={handleSearchSubmit} className="w-full max-w-lg mt-5 flex items-center mt-[-1rem]">
      <input
        type="text"
        placeholder="Looking for something specific?"
        className="flex-grow px-3 py-1 border border-gray-300 rounded-lg text-lg"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button type="submit" className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 text-sm">
        Search
      </button>
    </form>
        {noResults && (
          <div className="flex-grow text-red-500 text-xl mt-5">No results found</div>
        )}
        {searchResults.length > 0 && (
          <div className="border-4 border-yellow-200 rounded-md mt-5">
          {/* You can map through the searchResults array to display them */}
          {/* still need to write actual results rendering */}
            <div>
              {searchResults.map((result, index) => (
            <div key={index}>{result.name}</div>
            ))}
            </div>
          </div>
        )}
        {/*<div className={`text-3xl tracking-wide text-black`}>Dura-Europos</div>*/}
        <div className="border-4 border-beige-200 rounded-md">
          <DuraInteractive />
        </div>
      </div>
    </div>
    </div>
  );
};

export default LandingView;

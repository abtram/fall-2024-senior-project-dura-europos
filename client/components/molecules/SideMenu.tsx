import React, { useState } from "react";
import Image from "next/image"; // Import Image for the icons
import BackButton from "../atoms/BackButton"; // Import the BackButton component

// The SideMenu component
const SideMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false); // State to track menu open/close
  const [activeSection, setActiveSection] = useState(null); // Track active section (null for main menu)

  // Function to toggle the menu open/close
  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState); // Toggle state
    setActiveSection(null); // Reset to main menu view
  };

  // Function to open a specific section view
  const openSection = (section) => {
    setActiveSection(section);
  };

  // Function to go back to the main menu view
  const goBackToMenu = () => {
    setActiveSection(null);
  };

  return (
    <div>
      {!menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed top-4 left-4 h-16 w-auto flex items-center cursor-pointer transition-all duration-300"
        >
          <span className="mr-2 text-2xl font-bold text-black">Menu</span>
          <Image
            src="https://cdn.icon-icons.com/icons2/916/PNG/512/Menu_icon_icon-icons.com_71858.png"
            alt="Menu Icon"
            width={50}
            height={50}
          />
        </div>
      )}

      {menuOpen && (
        <div
          className={`fixed top-0 left-0 h-full w-80 bg-gray-800 bg-opacity-80 shadow-lg text-white overflow-y-auto transition-all duration-300`}
        >
          <div className="flex items-center justify-center mt-4">
            <button onClick={toggleMenu} className="absolute left-8">
              <Image
                src="https://www.iconsdb.com/icons/preview/white/x-mark-4-xxl.png"
                alt="Close Icon"
                width={30}
                height={30}
              />
            </button>
            <h2 className="text-center text-2xl font-bold w-full">Menu</h2>
          </div>

          {!activeSection ? (
            <div className="p-4 transition-opacity duration-300 opacity-100">
              <ul className="space-y-4 mt-8">
                <li>
                  <button
                    onClick={() => openSection("General Information")}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded-lg"
                  >
                    General Information
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openSection("How We Use Wikidata")}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded-lg"
                  >
                    How We Use Wikidata
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openSection("What is a Generous Interface?")}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded-lg"
                  >
                    What is a Generous Interface?
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openSection("About This Project")}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded-lg"
                  >
                    About This Project
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openSection("Useful Links")}
                    className="w-full text-left hover:bg-gray-700 p-2 rounded-lg"
                  >
                    Useful Links
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="p-4">
              <BackButton onClick={goBackToMenu} />

              {activeSection === "General Information" && (
                <div className="text-gray-300 text-sm">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    General Information
                  </h1>
                  <p className="mb-4">
                    This project is a digital archive of artifacts from Dura-Europos, an ancient city in present-day Syria known for its cultural diversity. The user-friendly interface allows for interactive exploration of artifacts, encouraging users to uncover connections between items, their locations, and historical contexts.
                  </p>
                  <p className="mb-4">
                    We've structured the Dura-Europos collection to make exploring the site more meaningful. Key archaeological structures are highlighted, allowing users to navigate directly to significant locations. Within each location, artifacts are categorized by type—such as pottery, sculptures, and inscriptions—making it easy to explore the unique finds in each area.
                  </p>
                  <p>
                    Explore this menu to learn more about our use of Wikidata, navigation features, and our approach to making cultural heritage collections accessible!
                  </p>
                </div>
              )}

              {activeSection === "How We Use Wikidata" && (
                <div className="text-gray-300 text-sm">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    How We Use Wikidata
                  </h1>
                  <p className="mb-4">
                    Our project aims to make the Dura-Europos collection freely accessible to everyone, not just those at universities. By connecting with Wikidata—a public, open database—we provide rich, up-to-date information on artifacts without requiring special access.
                  </p>
                  <p className="mb-4">
                    Often, details about historical artifacts are limited to academic sources behind paywalls. By using Wikidata, we ensure that anyone can explore information like artifact descriptions, images, and historical context. When you view an artifact, we use its unique identifier to pull the latest details from Wikidata, combining our curated data with fresh, public insights.
                  </p>
                  <p>
                    This approach supports our vision of a "generous interface," prioritizing exploration and accessibility, so users everywhere can learn about the history of Dura-Europos.
                  </p>
                </div>
              )}

              {activeSection === "What is a Generous Interface?" && (
                <div className="text-gray-300 text-sm">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    What is a Generous Interface?
                  </h1>
                  <p className="mb-4">
                    A "generous interface" is a design approach that emphasizes exploration and accessibility, encouraging users to browse collections openly rather than focusing on specific search results. In this project, it allows intuitive navigation of the Dura-Europos collection, guiding users visually through connections between artifacts, locations, and historical contexts.
                  </p>
                    The goal is to make the collection inclusive and engaging, offering a user-friendly experience that benefits both casual visitors and researchers. This approach transforms the Dura-Europos archive into an educational resource that's easy to explore and understand.
                  <p>
                  </p>
                </div>
              )}

              {activeSection === "About This Project" && (
                <div className="text-gray-300 text-sm">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    About This Project
                  </h1>
                  <p className="mb-4">
                    This project is part of an ongoing effort at Yale University to digitize and present the artifacts of Dura-Europos in an accessible, interactive format. Developed as a senior project in Fall 2024, it builds upon previous work and aims to create a user-friendly digital archive for exploring the ancient city’s rich history.
                  </p>
                  <p className="mb-4">
                    The project focuses on using a "generous interface" approach, allowing users to freely explore and connect with the artifacts in their historical and spatial context. By integrating dynamic data from sources like Wikidata and combining it with curated local information, this interface makes the Dura-Europos collection accessible to the public, scholars, and enthusiasts alike.
                  </p>
                  <p>
                    As an evolving initiative, this project welcomes future contributions and updates, supporting Yale's mission to make cultural heritage resources widely available through digital innovation.
                  </p>
                </div>
              )}

              {activeSection === "Useful Links" && (
                <div className="text-gray-300 text-sm">
                  <h1 className="text-2xl text-center font-bold mb-4">
                    Useful Links
                  </h1>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="https://duraeuroposarchive.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Dura-Europos Archive Project Overview
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.wikidata.org/wiki/Wikidata:WikiProject_IDEA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Wikidata Project Page
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://en.wikipedia.org/wiki/Dura-Europos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Dura-Europos Wikipedia Page
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://pleiades.stoa.org/places/893990?searchterm=dura+europos://example.com/research"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 underline"
                      >
                        Precise Geographic Mapping of the Archaeological Site
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SideMenu;

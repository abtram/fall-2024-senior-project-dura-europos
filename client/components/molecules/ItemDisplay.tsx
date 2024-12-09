import { useEffect, useState } from "react";
import { LocationObject } from "@/types";
import Image from "next/image";

interface Props {
  itemToDisplay: LocationObject | null;
  closeItem: () => void;
}

const ItemDisplay = ({ itemToDisplay, closeItem }: Props) => {
  const [wikidataInfo, setWikidataInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch Wikidata information based on the negativeNumber when itemToDisplay is available
  useEffect(() => {
    if (itemToDisplay && itemToDisplay.negativeNumber) {
      const fetchWikidataInfo = async () => {
        setLoading(true);
        setError(null);
        
        // SPARQL query to fetch relevant information from Wikidata
        const query = `
          SELECT ?item ?itemLabel ?image ?description ?inventoryNumber ?material ?materialLabel WHERE {
            {
              ?item wdt:P276 wd:Q464266 .  # Located in Dura-Europos
            }
            UNION
            {
              ?item wdt:P8583 ?yaleID .    # Yale University Art Gallery ID (P8583)
            }
            UNION
            {
              ?item wdt:P195 wd:Q1568434 . # Yale University Art Gallery (Q1568434)
            }
            UNION
            {
              ?item wdt:P1433 wd:Q114241199 . # WikiProject International (Digital) Dura-Europos Archive (Q114241199)
            }
            UNION
            {
              ?item wdt:P276 wd:Q49145 .   # Located in New Haven
            }
            UNION
            {
              ?item wdt:P217 "${itemToDisplay.accession}" . # Check for matching inventory number (P217)
            }
            UNION
            {
              ?item wdt:P217 "${itemToDisplay.negativeNumber}" . # Check for matching inventory number (P217)
            }
            ?item rdfs:label ?itemLabel .
            OPTIONAL { ?item schema:description ?description . }
            FILTER(CONTAINS(LCASE(?itemLabel), "${itemToDisplay.negativeNumber}") || CONTAINS(LCASE(?description), "${itemToDisplay.negativeNumber}")).
            OPTIONAL { ?item wdt:P18 ?image . }
            OPTIONAL { ?item wdt:P217 ?inventoryNumber . }
            OPTIONAL { ?item wdt:P186 ?material . }
            FILTER(LANG(?description) = "en").
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
          }
          LIMIT 10
        `;

        const url = `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(query)}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.results.bindings.length > 0) {
            setWikidataInfo(data.results.bindings[0]);  // Store the first result
          } else {
            setWikidataInfo(null);  // No results
          }
        } catch (err) {
          setError('Error fetching data from Wikidata');
        } finally {
          setLoading(false);
        }
      };

      fetchWikidataInfo();
    }
  }, [itemToDisplay]);

  return (
    <div>
      {itemToDisplay && (
        <div className="max-w-[40vw] h= bg-gray-500 p-5 overflow-scroll flex flex-col border-4 border-gray-400 h-full">
          <h2 className="text-3xl pb-5 max-w-[40vw]">{itemToDisplay.name}</h2>
          <div className="flex-1 grid gap-5 overflow-auto">
            {/* <Image
              src={itemToDisplay.link}
              width={450}
              height={450}
              alt={itemToDisplay.name}
            /> */}
            <div className="flex flex-col gap-2 w-full">
              {itemToDisplay.type && (
                <div className="flex align-center flex-col border-white border-b-2">
                  <span className="font-bold text-white">Type of artifact:</span>
                  <span>{itemToDisplay.type}</span>
                </div>
              )}
              {itemToDisplay.locationName && (
                <div className="flex flex-col border-white border-b-2">
                  <span className="font-bold text-white">Location Found:</span>
                  <span>{itemToDisplay.locationName}</span>
                </div>
              )}
              {itemToDisplay.accession && (
                <div className="flex flex-col border-white border-b-2">
                  <span className="font-bold text-white">YUAG Accession Number:</span>
                  <span>{itemToDisplay.accession}</span>
                </div>
              )}
              {itemToDisplay.negativeNumber && (
                <div className="flex flex-col border-white border-b-2">
                  <span className="font-bold text-white">YUAG Negative Number:</span>
                  <span>{itemToDisplay.negativeNumber}</span>
                </div>
              )}

              {/* Display Wikidata Info if available */}
              {loading && <p>Loading Wikidata information...</p>}
              {!loading && !error && wikidataInfo === null && (
                <p className="text-red-500" style={{ backgroundColor: 'white', padding: '0.3rem', borderRadius: '0.25rem' }}>
                  Unable to retrieve Wikidata information
                </p>
              )}
              {wikidataInfo && (
                <div className="flex flex-col gap-2 w-full border-white border-t-2">
                  <h3 className="text-2xl text-white">Wikidata Information:</h3>
                  <p><strong style={{ color: 'white' }}>Title:</strong> {wikidataInfo.itemLabel?.value}</p>
                  <p><strong style={{ color: 'white' }}>Description:</strong> {wikidataInfo.description?.value || "No description available"}</p>
                  <p><strong style={{ color: 'white' }}>Inventory Number: </strong>{wikidataInfo.inventoryNumber?.value || "No inventory number available"}</p>
                  <p><strong style={{ color: 'white' }}>Artifact Material: </strong>{wikidataInfo.materialLabel?.value || "No material information available"}</p>
                  {/* Display link to Wikidata page */}
                  {wikidataInfo.item?.value && (
                    <p>
                      <strong style={{ color: 'white' }}>Wikidata Link:</strong>{" "}
                      <a href={wikidataInfo.item.value} target="_blank" rel="noopener noreferrer">
                        {wikidataInfo.item.value}
                      </a>
                    </p>
                  )}
                  {/* Display the image if available */}
                  {wikidataInfo.image?.value && (
                    <img
                      src={wikidataInfo.image.value}
                      alt="Wikidata Image"
                      width={300}
                      height={300}
                    />
                  )}
                </div>
              )}
              <div>
                <button
                  type="button"
                  onClick={closeItem}
                  className="border-4 border-gray-400 bg-blue p-3 rounded-xl"
                  onMouseEnter={(e) => {
                    (e.target as Element).classList.remove("bg-blue");
                    (e.target as Element).classList.add("bg-gray-400");
                  }}
                  onMouseLeave={(e) => {
                    (e.target as Element).classList.remove("bg-gray-400");
                    (e.target as Element).classList.add("bg-blue");
                  }}
                >
                  Close Item
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDisplay;

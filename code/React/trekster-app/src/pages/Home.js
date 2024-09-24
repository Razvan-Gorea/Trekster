import Attractions from "../components/Attractions";
import Trails from "../components/Trails";
import { Weather } from "../components/Weather";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, ScaleControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export function Home() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showList, setShowList] = useState(true);
  const [isAVisible, setAVisibility] = useState(true);
  const [isTVisible, setTVisibility] = useState(true);
  const [map, setMap] = useState(null);

  const toggleAVisibility = () => {
    setAVisibility(!isAVisible);
  };

  const toggleTVisibility = () => {
    setTVisibility(!isTVisible);
  };

  const handleButtonClick = (item) => {
    if (map) {
      map.flyTo([item.y, item.x], 15);
    }
  };

  const handleSearch = () => {
    const results = data.filter((item) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setHasSearched(true);
  };

  const debounce = (mainFunction, delay) => {
    let timer;

    return function (...args) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    debounce(handleSearch, 100)();
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
    setHasSearched(false);
    setShowList(true);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/trails/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div>
        <h1 className="max-w-lg text-3xl font-semibold leading-relaxed text-gray-900 dark:text-white ml-6 transform translate-x-3 translate-y-4"></h1>
      </div>
      <div class="bg-gray-800 text-white px-6 py-3">
        <h1 class="text-2xl font-bold">Trekster Interactive Map</h1>
      </div>
      <button
        style={{ width: "20%" }}
        class="bg-white hover:bg-blue-400 text-black font-bold py-2 px-4"
        onClick={toggleAVisibility}
      >
        {isAVisible ? "Hide Attractions" : "Show Attractions"}
      </button>
      <button
        style={{ width: "20%" }}
        class="bg-white hover:bg-blue-400 text-black font-bold py-2 px-4 "
        onClick={toggleTVisibility}
      >
        {isTVisible ? "Hide Trails" : "Show Trails"}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ height: "90%", width: "30%" }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <div class="relative mb-3" data-te-input-wrapper-init>
              <input
                type="search"
                class="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-white bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-black focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 placeholder:text-grey dark:focus:border-primary"
                value={searchTerm}
                onChange={handleInputChange}
                id="search"
                placeholder="Search for a trail..."
                required
              />
            </div>
            <button
              style={{ width: "100%" }}
              class="bg-white hover:bg-blue-400 text-black font-bold py-2 px-4"
              onClick={clearSearch}
            >
              Hide
            </button>
          </form>
          <br />
          <br></br>
          <br></br>
          {showList && hasSearched && (
            <div
              style={{
                overflowY: "scroll",
                height: "80%",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-md transform -translate-y-10">
                {filteredData.map((item, index) => (
                  <div>
                    <button
                      style={{ width: "100%", justifyContent: "center" }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      key={index}
                      onClick={() => handleButtonClick(item)}
                    >
                      <div className="text-lg">
                        <h1>{item.Name}</h1>
                      </div>
                      <div className="text-sm">
                        {item.Activity === "Walking" &&
                        item.AscentMetres >= 150 ? (
                          <span>Hiking</span>
                        ) : (
                          <span>{item.Activity}</span>
                        )}{" "}
                        -
                        {item.Difficulty === "Easy" ? (
                          <span style={{ color: "green" }}> Easy</span>
                        ) : item.Difficulty === "Moderate" ? (
                          <span style={{ color: "orange" }}> Moderate</span>
                        ) : (
                          <span style={{ color: "red" }}> Hard</span>
                        )}
                      </div>
                    </button>
                    <br></br>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <MapContainer
          ref={setMap}
          center={[53.4129, -8.2439]}
          zoom={7}
          style={{ height: "90%", width: "60%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <ScaleControl position="bottomleft" />
          {isAVisible ? <Attractions /> : <></>}
          {isTVisible ? <Trails /> : <></>}
        </MapContainer>
        <Weather />
      </div>
    </>
  );
}

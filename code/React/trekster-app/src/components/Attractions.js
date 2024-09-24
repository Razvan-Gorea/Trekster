import { Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import L from "leaflet";

const Attractions = () => {
  const [attractions, setAttractions] = useState();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions/", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setAttractions(data);
      })
      .catch((error) => {
        console.error("Fetching data failed: ", error);
      });
  }, []);

  const myIcon = new L.Icon({
    iconUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconRetinaUrl:
      "https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png",
    iconSize: [20, 20],
  });

  return (
    <>
      {attractions !== undefined
        ? attractions.map(
            (item, index) =>
              Number(item.latitude) &&
              Number(item.longitude) && (
                <Marker
                  key={index}
                  position={[item.longitude, item.latitude]}
                  icon={myIcon}
                >
                  <Popup>
                    {item.name}
                    <br></br>
                    <br></br>
                    <a href={item.url}>More info @</a>
                  </Popup>
                </Marker>
              )
          )
        : null}
      )
    </>
  );
};

export default Attractions;

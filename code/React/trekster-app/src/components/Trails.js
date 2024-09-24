import React, { useState, useEffect } from "react";
import { Polyline, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const findTrail = (trails, id) => {
  var currTrail = trails.find((trail) => trail.TrailID === id);
  if (currTrail) {
    return currTrail;
  }
};

const getTrailHead = (trail) => {
  if (trail) {
    return [trail.y, trail.x];
  }
};

const mapTrailInfo = (trail) => {
  if (trail) {
    return (
      <div className={"space-y-7"}>
        <div className="text-lg">
          <h1>{trail.Name}</h1>
        </div>
        <div>Length: {trail.LengthinKm}km</div>
        <div>Type: {trail.Activity} Trail</div>
        <div>Difficulty: {trail.Difficulty} Trail</div>
        <div>{trail.Description}</div>
        <div>
          <a href={trail.Website}>More info</a>
        </div>
      </div>
    );
  }
};

const Trails = () => {
  const [mappings, setTrailMappings] = useState([]);
  const [trails, setTrails] = useState([]);
  const [routes, setRoutes] = useState();

  const walkingIcon = new L.Icon({
    iconUrl: "http://localhost:3000/walking_marker.png",
    iconRetinaUrl: "http://localhost:3000/walking_marker.png",
    iconSize: [30, 30],
  });
  const hikingIcon = new L.Icon({
    iconUrl: "http://localhost:3000/hiking_marker.png",
    iconRetinaUrl: "http://localhost:3000/hiking_marker.png",
    iconSize: [30, 30],
  });
  const cyclingIcon = new L.Icon({
    iconUrl: "http://localhost:3000/cycling_marker.png",
    iconRetinaUrl: "http://localhost:3000/cycling.png",
    iconSize: [30, 30],
  });

  const resolveTrail = (trail) => {
    if (trail) {
      if (trail.AscentMetres === undefined && trail.Activity === "Walking") {
        return walkingIcon;
      }
      if (trail.Activity === "Walking" && trail.AscentMetres > 150) {
        return hikingIcon;
      }
      if (trail.Activity === "Cycling") {
        return cyclingIcon;
      }
      return walkingIcon;
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/trails/")
      .then((response) => response.json())
      .then((data) => {
        setTrails(data);
      })
      .catch((error) => console.error("Error fetching trails:", error));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/mappings/")
      .then((response) => response.json())
      .then((data) => {
        setTrailMappings(data);
      })
      .catch((error) => console.error("Error fetching mappings:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/geometries.json", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error! status: $(response.status)");
        }
        return response.json();
      })
      .then((data) => {
        setRoutes(data);
      })
      .catch((error) => {
        console.error("Fetching data failed: ", error);
      });
  }, []);

  return (
    <ul>
      {routes !== undefined && mappings !== undefined
        ? mappings.map((mapping) => (
            <li key={mapping.id}>
              <Marker
                position={getTrailHead(findTrail(trails, mapping.TrailID))}
                icon={resolveTrail(findTrail(trails, mapping.TrailID))}
              >
                <Popup>
                  <div className="box-content">
                    {!trails && trails.length === 0
                      ? null
                      : mapTrailInfo(findTrail(trails, mapping.TrailID))}
                  </div>
                </Popup>
              </Marker>
              <Polyline
                positions={
                  routes.features[mapping.feature_index].geometry.coordinates
                }
                pathOptions={{ color: "purple" }}
              >
                <Popup>
                  <div className="box-content">
                    {!trails && trails.length === 0
                      ? null
                      : mapTrailInfo(findTrail(trails, mapping.TrailID))}
                  </div>
                </Popup>
              </Polyline>
            </li>
          ))
        : null}
    </ul>
  );
};
export default Trails;

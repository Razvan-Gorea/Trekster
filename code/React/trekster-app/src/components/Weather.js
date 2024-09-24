import React, { useState, useEffect } from "react";

export function Weather() {
  const [data, setData] = useState();
  const [county, setCounty] = useState("");

  const counties = [
    "Carlow",
    "Cavan",
    "Clare",
    "Cork",
    "Donegal",
    "Dublin",
    "Galway",
    "Kerry",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Leitrim",
    "Limerick",
    "Longford",
    "Louth",
    "Mayo",
    "Meath",
    "Monaghan",
    "Offaly",
    "Roscommon",
    "Sligo",
    "Tipperary",
    "Waterford",
    "Westmeath",
    "Wexford",
    "Wicklow",
  ];

  const handleCountyChange = (event) => {
    const choosenCounty = event.target.value;
    if (choosenCounty !== "") {
      setCounty(choosenCounty);
    }
  };

  useEffect(() => {
    if (county) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?q=${
          county + " ireland"
        }&days=1&key=`, //ADD API KEY HERE <--- FROM WEATHERAPI.COM
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data); // Store the fetched data in state
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  }, [county]); // Dependency array includes `county` to run the effect when `county` changes

  return (
    <div style={{ overflow: "auto", height: "90%" }}>
      <div>
        <label className="block text-big font-big text-white ml-5">
          Counties
        </label>{" "}
        <br></br>
        <select
          value={county}
          onChange={handleCountyChange}
          className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-md transform -translate-y-8"
        >
          <option value="">Please select</option>
          {counties.map((county) => (
            <option key={county} value={county.toLowerCase()}>
              {county}
            </option>
          ))}
        </select>
      </div>

      <div>
        {data && (
          <>
            <div className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-md transform -translate-y-10">
              <h2 className="font-bold text-lg">Initial Information</h2>
              <hr />
              <br></br>
              <p>County: {data.location.region}</p>
              <p>Country: {data.location.country}</p>
              <p>Local Time: {data.location.localtime}</p>
              <p>
                Temperature: {data.current.temp_c}°C/{data.current.temp_f}°F
              </p>
              <p>Last Updated: {data.current.last_updated}</p>
            </div>

            <div className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-md transform -translate-y-10">
              <h2 className="font-bold text-lg">Current Weather</h2>
              <hr />
              <br></br>
              <p>Current Condition: {data.current.condition.text}</p>
              <p>Current Wind MPH: {data.current.wind_mph}</p>
              <p>Current Wind KPH: {data.current.wind_kph}</p>
              <p>Current Wind Degree: {data.current.wind_degree} </p>
              <p>Current Wind Direction: {data.current.wind_dir}</p>
              <p>Current Pressure (in millibars): {data.current.pressure_mb}</p>
              <p>Current Precipitation (in mm): {data.current.precip_mm}</p>
            </div>
          </>
        )}
      </div>
      <div>
        {data && (
          <>
            <div className="text-black bg-white shadow-lg rounded-lg p-6 m-4 max-w-md transform -translate-y-10">
              <h2 className="font-bold text-lg">Forecast (Today)</h2>
              <hr />
              <br></br>
              {data.forecast.forecastday.map((day) =>
                day.hour.map((hour) => (
                  <div key={hour.time}>
                    <p>
                      {hour.time.slice(10)}: {hour.condition.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

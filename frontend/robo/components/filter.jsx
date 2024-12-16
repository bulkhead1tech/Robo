import React, { useState, useEffect } from "react";
import Map from "../src/map.jsx";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
function Filter() {
  const [data, setData] = useState([]);
  const [online, setOnline] = useState(null);
  const [battery, setBattery] = useState("");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("json_data", (unfilteredData) => {
      console.log("Received data:", unfilteredData);
      setData(unfilteredData);
    });
    socket.emit('request_data')
    socket.on("filtered_data", (filteredData) => {
      console.log("Received filtered data:", filteredData);
      setData(filteredData);
    });
    return () => {
      socket.off("connect");
      socket.off("json_data");
    };
  }, []);
  const handleFilterChange = () => {
    socket.emit("filter_data", {
      online,
      battery_min: battery,
    });
    alert("DATA UPDATED SUCCESSFULLY")
  };

  const locations = data.map((robot) => ({
    latitude: robot.Location[0],
    longitude: robot.Location[1],
    name: robot.Robotname,
    battery: robot.Battery,
    online: robot.Online,
  }));
  return (
    <>
      <div className="grid bg-colors bg-cover h-screen w-screen sm:grid-cols-1 md:grid-cols-5 overflow-scroll">
        <div className="bg-transparent col-span-2 grid grid-cols-7 grid-rows-4">
          <div className="bg-creame rounded-lg outline-1 border-sky-200 border-1 backdrop-blur-sm backdrop-brightness-200 row-span-2 row-start-2 col-start-2 col-span-4 flex flex-col justify-center items-center">
            <h1 className="font-bold mb-2 text-xl">CREATE FILTERS</h1>
           
           <form className="flex flex-col justify-center items-center" onSubmit={(e)=>{e.preventDefault(), handleFilterChange()}}> 
            <label className="mt-4" htmlFor="">
              BATTERY:
            </label>

            <select
              className=" p-2 w-48 border border-gray-300 rounded"
              onChange={(e) => setBattery(e.target.value)}
            >
              {" "}
              <option value="null" disabled>
                Select an option
              </option>{" "}
              <option value="low">Low battery</option>{" "}
              <option value="enough">Enough battery</option>{" "}
            </select>
            <label className="mt-4" htmlFor="">
              Online status:
            </label>
            <select onChange={(e) => setOnline(e.target.value)} className=" w-48  p-2 border border-gray-300 rounded">
              {" "}
              <option value="" disabled>
                Select an option
              </option>{" "}
              <option value="true">Online</option>{" "}
              <option value="false">Offline</option>{" "}
            </select>
            <button type="submit" className="w-48 mb-9 h-auto font-semibold bg-green-500 rounded-lg hover:bg-green-600 mt-6 px-1 py-2">
              Search
            </button></form>
          </div>
          <div className="row-start-3 col-start-2"></div>
        </div>
        <div className="rounded-lg flex justify-center items-center col-span-3">
          <div className="flex h-3/5 rounded-lg bg-red-800 w-4/5 border-5 border-solid border-red-700 justify-center items-center">
            <Map locations={locations} />
          </div>
        </div>
        <div className=" col-span-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {data.map((robot, index) => (
          <div
            key={index}
            className="bg-glass backdrop-blur-sm shadow-lg rounded-lg overflow-hidden"
          >
            <div className="grid align-middle grid-cols-1 md:grid-cols-1 gap-4 p-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {robot.Robotname}
              </h2>
              <p className="text-black-600 mt-2">
                Online: {robot.Online ? "Yes" : "No"} {"  "} <br />
                Battery: {robot.Battery}
                {"%"}
              </p>
              <p className="text-black-600">
                CPU: {robot.CPU} {"  "} <br /> RAM: {robot.RAM}
              </p>
              <p className="text-black-600 ">
                Last-updated: {robot.LastUpdated}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default Filter;

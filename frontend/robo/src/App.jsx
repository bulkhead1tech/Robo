import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "./map.jsx";
function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/robo?page=${page}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("not found");
      }
    };
    fetchData();
  }, [page]);



  const locations = data.map((robot) => ({
    latitude: robot.Location[0],
    longitude: robot.Location[1],
    name: robot.Robotname,
    battery: robot.Battery,
    online: robot.Online,
  }));
  console.log(page)
  return (
    <div className="h-screen w-screen  bg-colors bg-cover overflow-scroll">
      <div className="h-full w-full flex justify-center items-center">
        <div className="h-3/5 w-4/5 bg-glass rounded-lg backdrop-blur-sm mx-auto backdrop-saturate-200">
          <Map locations={locations} />
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
      <button
       
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="bg-cyan-600 text-white py-2 px-4 mx-auto hover:bg-yellow-400  rounded transition duration-300"
      >
        {"<< "}
        Previous{" "}
      </button>{" "}
    
      <h1 className="place-self-center text-7xl font-extrabold text-cyan-600">
        ROBOTS DETAILS
      </h1>
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === 10}

        className="bg-cyan-600 text-white py-2 px-4 mx-auto rounded hover:bg-yellow-400 transition duration-300"
      >
        {" "}
        Next{" >> "}
      </button></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
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
  );
}

export default App;

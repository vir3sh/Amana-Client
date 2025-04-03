import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/flower.css"; // Importing the CSS file for animation

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/flowers`
        );
        setFlowers(response.data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      } finally {
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchFlowers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flower">
          <div className="petal petal1"></div>
          <div className="petal petal2"></div>
          <div className="petal petal3"></div>
          <div className="petal petal4"></div>
          <div className="petal petal5"></div>
          <div className="petal petal6"></div>
          <div className="petal petal7"></div>
          <div className="petal petal8"></div>
          <div className="center"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb />
      <div className="min-h-screen  flex flex-col items-center p-5 bg-[#2a734f]">
        <h1 className="text-3xl text-white font-bold mb-4">Amana Flowers</h1>
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-5">
          {flowers.length === 0 ? (
            <p className="text-center text-gray-500">No flowers available.</p>
          ) : (
            <ul className="space-y-4">
              {flowers.map((flower) => (
                <li
                  key={flower._id}
                  className="relative flex justify-between items-center p-3 bg-gray-50 rounded-lg shadow hover:bg-gray-200 transition duration-300 group"
                >
                  <span className="text-lg font-semibold">{flower.name}</span>

                  <div className="relative flex items-center">
                    <div
                      className={`w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-all ${
                        flower.available ? "bg-[#208f58]" : "bg-[#f13536]"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 bg-gray-300 rounded-full shadow-md transform transition-all ${
                          flower.available ? "translate-x-8" : "translate-x-0"
                        }`}
                      ></div>
                    </div>

                    {/* Tooltip on the Right Side of the Switch */}
                    <div className="absolute left-[120%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md">
                      {flower.available ? "Available" : "Unavailable"}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default FlowerList;

import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/flower.css";
import amanadefault from "../assets/amana-default.webp";

const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null); // 🌸

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
      <div className="min-h-screen flex flex-col items-center p-5 bg-[#2a734f]">
        <h1 className="text-3xl text-white font-bold mb-4">Amana Flowers</h1>
        <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-5">
          {flowers.length === 0 ? (
            <p className="text-center text-gray-500">No flowers available.</p>
          ) : (
            <ul className="space-y-4">
              {flowers.map((flower) => (
                <li
                  key={flower._id}
                  className="relative flex items-center space-x-4 p-3 bg-gray-50 rounded-lg shadow hover:bg-gray-200 transition duration-300 group"
                >
                  {/* Flower Image - Click to view modal */}
                  <img
                    src={flower.image ? flower.image : amanadefault}
                    alt={flower.name}
                    className="w-16 h-16 object-cover rounded-md mr-3 cursor-pointer"
                    onClick={() =>
                      setSelectedImage(flower.image || amanadefault)
                    }
                  />

                  <div className="flex-1 flex justify-between items-center">
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
                      <div className="absolute left-[120%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs px-3 py-1 rounded-md shadow-md">
                        {flower.available
                          ? "Flowers Available"
                          : "Flowers Unavailable"}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-[90%] p-6 animate-scaleIn">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition text-2xl leading-none font-bold"
              aria-label="Close"
            >
              &times;
            </button>

            <img
              src={selectedImage}
              alt="Flower"
              className="w-full h-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FlowerList;

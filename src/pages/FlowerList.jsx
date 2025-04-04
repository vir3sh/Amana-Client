import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Breadcrumb from "../components/Breadcrumb";
import "../assets/flower.css";
import amanadefault from "../assets/amana-default.webp";
import React from "react";
const FlowerList = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const flowersPerPage = 8;

  const fetchFlowers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/flowers`
      );
      setFlowers(response.data);
    } catch (err) {
      console.error("Error fetching flowers:", err);
      setError("Failed to load flowers. Please try again later.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, []);

  useEffect(() => {
    fetchFlowers();
  }, [fetchFlowers]);

  const filteredFlowers = flowers.filter((flower) => {
    const matchesSearch = flower.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "all") return matchesSearch;
    if (filter === "available") return matchesSearch && flower.available;
    if (filter === "unavailable") return matchesSearch && !flower.available;
    return matchesSearch;
  });

  // Pagination logic
  const indexOfLastFlower = currentPage * flowersPerPage;
  const indexOfFirstFlower = indexOfLastFlower - flowersPerPage;
  const currentFlowers = filteredFlowers.slice(
    indexOfFirstFlower,
    indexOfLastFlower
  );
  const totalPages = Math.ceil(filteredFlowers.length / flowersPerPage);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilter("all");
    setCurrentPage(1);
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-[#1a5a3a] to-[#2a734f]">
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

  const ErrorMessage = () => (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5a3a] to-[#2a734f] flex items-center justify-center">
      <div className="bg-white/90 p-8 rounded-xl max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error}</p>
        <button
          onClick={fetchFlowers}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );

  const SearchFilterBar = () => (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full md:w-64">
        <input
          type="text"
          placeholder="Search flowers..."
          className="w-full pl-10 pr-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex gap-2">
        {["all", "available", "unavailable"].map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );

  const FlowerCard = ({ flower }) => (
    <li className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={flower.image || amanadefault}
          alt={flower.name}
          className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-110"
          onClick={() => setSelectedImage(flower.image || amanadefault)}
          loading="lazy"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white ${
            flower.available ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {flower.available ? "Available" : "Unavailable"}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{flower.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            {flower.available ? "In stock" : "Out of stock"}
          </div>
          <div
            className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-all ${
              flower.available ? "bg-[#208f58]" : "bg-[#f13536]"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all ${
                flower.available ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      </div>
    </li>
  );

  const EmptyState = () => (
    <div className="text-center py-16">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
      <p className="mt-4 text-lg text-gray-600">
        No flowers match your search criteria.
      </p>
      <button
        onClick={handleClearFilters}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );

  const ImageModal = () =>
    selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
        onClick={() => setSelectedImage(null)}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full animate-scaleIn overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-800 hover:bg-red-500 hover:text-white transition-colors z-10"
            aria-label="Close"
          >
            &times;
          </button>

          <div className="max-h-[80vh] overflow-hidden">
            <img
              src={selectedImage}
              alt="Flower"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    );

  const Pagination = () =>
    totalPages > 1 && (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md bg-green-100 text-green-800 disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      </div>
    );

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a5a3a] to-[#2a734f]">
      <Breadcrumb />
      <div className="container mx-auto px-4 py-10">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 font-serif">
            Amana Flowers
          </h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            Discover our beautiful collection of carefully grown flowers,
            perfect for any occasion.
          </p>
        </header>

        <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-100 to-green-50">
            <SearchFilterBar />

            {filteredFlowers.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentFlowers.map((flower) => (
                    <FlowerCard key={flower._id} flower={flower} />
                  ))}
                </ul>
                <Pagination />
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-green-200 text-sm">
            &copy; {new Date().getFullYear()} Amana Flowers - Beautiful blooms
            for every occasion
          </p>
        </div>
      </div>

      <ImageModal />
    </div>
  );
};

export default FlowerList;

import React from "react";
import amanaflower from "../assets/amana-flower.webp";
import amana from "../assets/AMAN.png";

const Breadcrumb = () => {
  return (
    <div
      className="w-full h-[250px] flex items-center justify-center bg-cover bg-center shadow-md"
      style={{
        backgroundImage: `url(${amanaflower})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="px-6 py-3 rounded-lg">
        <img src={amana} alt="Amana" className="h-[250px] object-contain" />
      </div>
    </div>
  );
};

export default Breadcrumb;

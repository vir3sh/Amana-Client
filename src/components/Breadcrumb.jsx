import React from "react";
import amanaflower from "../assets/amana-flower.webp";
import amana from "../assets/AMAN.png";

const Breadcrumb = () => {
  return (
    <div
      className="w-full h-[453px] flex items-center justify-center bg-cover bg-center shadow-md"
      style={{
        backgroundImage: `url(${amanaflower})`,
        backgroundSize: "cover", // Ensures full coverage
        backgroundPosition: "center", // Centers the image
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "453px",
      }}
    >
      <div className=" px-6 py-3 rounded-lg ">
        <img src={amana}></img>
      </div>
    </div>
  );
};

export default Breadcrumb;

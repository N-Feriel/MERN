import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import momGroup from "../assets/momsgroup.jpg";
import peau from "../assets/peau-bebe.jpg";

function Banner() {
  return (
    <div className="relative">
      <div className="absolute bottom-0 z-20 w-full h-32 bg-gradient-to-t from-pink-100 to-transparent rounded-b-3xl " />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img
            loading="lazy"
            src={momGroup}
            alt=""
            className="contain rounded-3xl"
          />
        </div>
        <div className="w-full h-full p-6 m-auto bg-pink-700 rounded-3xl">
          <h2 className="m-6 text-lg text-center text-white">
            Welecome To Time Manager App
          </h2>
          <p>thanks For your time and your help</p>

          <p className="m-10 text-gray-500">
            Please if you have probleme contact admin{" "}
          </p>
        </div>

        <div>
          <img
            loading="lazy"
            src={peau}
            alt=""
            className="cover rounded-t-3xl "
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;

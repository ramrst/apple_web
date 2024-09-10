"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoPlayCircleOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import VideoCarousel from "./VideoCarousel";
const Highlights = () => {
  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    });
  });
  useGSAP(() => {
    gsap.to(".link", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.25,
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full bg-zinc common-padding relative"
    >
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between flex ">
          <h1 id="title" className="section-heading">
            Get the highlights .
          </h1>
          <div className="flex flex-wrap items-end   gap-5 ">
            <a href="" className="link">
              Watch the film <IoPlayCircleOutline />
            </a>

            <a href="" className="link " id="event">
              Watch the event
              <IoIosArrowForward />
            </a>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;

"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero: React.FC = (): JSX.Element => {
  useGSAP(() => {
    gsap.to(".hero-title", {
      opacity: 1,
      delay: 1.5,
    });
  });
  useGSAP(() => {
    gsap.to("#cta", {
      opacity: 1,
      translateY: 0,
      delay: 2,
    });
  });
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  const handleVideoSrcSet = () => {
    if (window.innerWidth > 768) {
      setVideoSrc("/assets/hero.mp4");
    } else {
      setVideoSrc("/assets/smallHero.mp4");
    }
  };

  useEffect(() => {
    // Set the initial video source after the component mounts
    handleVideoSrcSet();

    // Add the resize event listener
    window.addEventListener("resize", handleVideoSrcSet);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleVideoSrcSet);
    };
  }, []);

  return (
    <section className="w-full nav-height relative pb-20">
      <div className="h-5/6 w-full flex-center flex-col">
        <p className="md:hero-title hero-title  max-md:!text-xl">
          iPhone 15 Pro
        </p>
        <div className="md:w-10/12 w-9/12">
          {videoSrc && (
            <video autoPlay muted playsInline loop>
              <source src={videoSrc} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20 "
      >
        <a href="#highlights" className="btn">
          Buy Now
        </a>
        <p className="font-normal text-xl text-white">
          From $199/month or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;

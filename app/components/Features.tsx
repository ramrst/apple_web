"use client";
import React from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { explore1Img, explore2Img, exploreVideo } from "../constants";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);
const Features = () => {
  useGSAP(() => {
    gsap.to("#features_title", {
      scrollTrigger: {
        trigger: "#features_title",
        end: "bottom 20%",
        toggleActions: "restart none none none",
      },
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });
    gsap.to("#explore_video", {
      scrollTrigger: {
        trigger: "#explore_video",

        toggleActions: "play pause reverse restart",
        markers: true,
      },

      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      },
    });
    gsap.to(".g_grow", {
      scrollTrigger: {
        trigger: ".g_grow",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "restart reverse restart reverse",
        scrub: 5.5,
      },
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power1",
    });
    gsap.to(".g_text", {
      scrollTrigger: {
        trigger: ".g_text",
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none  none",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.3,
    });
  }, []);
  const videoRef = React.useRef();
  return (
    <section className="w-full bg-zinc common-padding overflow-hidden relative ">
      <div className="screen-max-width">
        <div className="mb-12 w-full">
          <h1 id="features_title" className="section-heading ">
            Explore the full story .
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center overflow-hidden">
          <div className="mt-32 mb-24 pl-24">
            <h2 className="text-5xl lg:text-6xl font-semibold">
              iPhone. Forged in Titanium .
            </h2>
          </div>
          <div className="flex-center flex-col sm:px-10 ">
            <div className="relative h-[50vh] w-full flex items-center mb-3 rounded-md overflow-hidden">
              <video
                playsInline
                muted
                className="w-full h-full object-cover object-center "
                id="explore_video"
                ref={videoRef}
                preload="none"
                loop
              >
                <source src={exploreVideo} type="video/mp4" />
              </video>
            </div>
            <div className="flex-col relative w-full flex">
              <div className="feature-video-container">
                <div className="overflow-hidden flex-1 h-[50vh] rounded-md">
                  <Image
                    className="feature-video g_grow "
                    src={explore1Img}
                    alt="explore1"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="overflow-hidden flex-1 h-[50vh] rounded-md">
                  <Image
                    className="feature-video g_grow "
                    src={explore2Img}
                    alt="explore2"
                    width={400}
                    height={400}
                  />
                </div>
              </div>
              <div className="featre-text-container">
                <div className="flex-1 flex-center max-sm:flex-col gap-5 mt-5">
                  <p className="feature-text g_text">
                    iPhone 15 pro is{" "}
                    <span className="font-semibold text-white mr-1">
                      the first iPhone to feature an aerspace-grade titanium
                      design,
                    </span>
                    using the same alloy that the spacecraft use for missions to
                    Mars.
                  </p>
                  <p className="feature-text g_text">
                    Titanium has one of the best strength-to-weight ratios of
                    any metal, making these our{" "}
                    <span className="font-semibold text-white mr-1">
                      ligtest Pro models ever built.{" "}
                    </span>
                    You'll notice the diffrence the moment you pick one up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;

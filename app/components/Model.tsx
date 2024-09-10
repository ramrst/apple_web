"use client";
import { useGSAP } from "@gsap/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ModelVue from "./ModelVue";
import { models, sizes, yellowImg } from "../constants";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { animateWithGsapTimeLine } from "../animation/animation";
gsap.registerPlugin(ScrollTrigger);

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iphone 15 pro in natural Titanium",
    color: ["#8F8A81", "#FFE7B9 ", "#6F6C64"],
    img: yellowImg,
  });
  // camera controls
  const cameraControlSmall = useRef<THREE.Camera>();
  const CameraControlLarge = useRef<THREE.Camera>();
  const small = useRef<THREE.Group>(new THREE.Group());
  const large = useRef<THREE.Group>(new THREE.Group());
  // rotation value of each model
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  useGSAP(() => {
    gsap.to("#modelHeading", {
      scrollTrigger: {
        trigger: "#modelHeading",
        toggleActions: "play none none none",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      duration: 2,
    });
  }, []);
  const [eventSource, setEventSource] = useState<any>();
  useEffect(() => {
    setEventSource(document.getElementById("root"));
  }, []);
  const tl = gsap.timeline();
  useEffect(() => {
    if (size === "large") {
      animateWithGsapTimeLine(tl, small, smallRotation, "#view1", "#view2", {
        transform: "translateX(-80%)",
        duration: 2,
      });
    }
    if (size === "small") {
      animateWithGsapTimeLine(tl, large, largeRotation, "#view2", "#view1", {
        transform: "translateX(0)",
        duration: 2,
      });
    }
  }, [size]);
  return (
    <section className="common-padding ">
      <div className="screen-max-width ">
        <h1 className="section-heading " id="modelHeading">
          Take a closer look.
        </h1>
        <div className="flex flex-col item-center mt-5 ">
          <div className="w-full h-[75vh] nd:h-[90vh] overflow-hidden relative">
            <ModelVue
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelVue
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={CameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                overflow: "hidden",
              }}
              eventSource={eventSource}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full ">
            <p className="text-center text-lg font-semibold mb-5 text-white">
              {model.title}
            </p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((model: any, index: number) => (
                  <li
                    key={index}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer"
                    style={{
                      backgroundColor: model.color[0],
                    }}
                    onClick={() => {
                      setModel(model);
                    }}
                  ></li>
                ))}
              </ul>
              <button className="size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? "white" : "transparent",
                      color: size === value ? "black" : "white",
                      fontWeight: size === value ? "bold" : "",
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;

("use client ");
import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { hightlightsSlides } from "../constants/index.jsx";
import { VscDebugRestart } from "react-icons/vsc";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);
  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;
  console.log(videoRef);
  const [loadedData, setLoadedData] = useState([]);
  useEffect(() => {
    console.log("loadedData", loadedData);
    if (loadedData.length != 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        console.log("startplayingtop", startPlay);
        startPlay && videoRef.current[videoId].play();
      }
    }
  }, [videoId, startPlay, isPlaying, loadedData]);
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId == 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration
        );
      };
      if (isPlaying) gsap.ticker.add(animUpdate);
      else gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);
  const handleProcess = (process: string, i: number) => {
    switch (process) {
      case "reset-video":
        setVideo((preVid) => ({
          ...preVid,
          videoId: i,
          isLastVideo: i === 3 ? true : false,
        }));
        console.log("reset");
        break;
      case "play-video":
        setVideo((preVid) => ({ ...preVid, isPlaying: true, startPlay: true }));
        break;
      case "pause-video":
        setVideo((preVid) => ({ ...preVid, isPlaying: false }));
        break;
      case "video-end":
        setVideo((preVid) => ({ ...preVid, isEnd: true, videoId: i + 1 }));
        break;
      case "last-video":
        setVideo((preVid) => ({ ...preVid, isLastVideo: true }));

        break;

      default:
        break;
    }
  };
  const handleLoadedMetaData = (e: any) => {
    console.log("loaded", e);
    setLoadedData((pre) => [...pre, e]);
  };
  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none ",
        end: "bottom 80%",
      },
      onComplete: () => {
        setVideo((preVid) => ({ ...preVid, startPlay: true, isPlaying: true }));
      },
    }),
      gsap.to("#slider", {
        transform: `translateX(${videoId * -100}%)`,
        duration: 2,
        ease: "power1.inOut",
      });
  }, [videoId, isEnd]);

  console.log(video);
  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((slide, index) => (
          <div key={index} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container ">
              <div className="w-full h-full text-center rounded-3xl overflow-hidden bg-black">
                <video
                  id="video"
                  preload="auto"
                  muted
                  playsInline
                  ref={(el) => (videoRef.current[index] = el)}
                  onPlay={() =>
                    setVideo((preVid) => ({ ...preVid, isPlaying: true }))
                  }
                  onLoadedMetadata={handleLoadedMetaData}
                  onEnded={() => {
                    if (index == hightlightsSlides.length - 1) {
                      handleProcess("last-video", 0);
                    } else {
                      handleProcess("video-end", index);
                    }
                  }}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {slide.textLists.map((text, index) => (
                  <p
                    key={index}
                    className="text-white md:text-2xl text-xl font-medium"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex-center mt-10 ">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="bg-gray-200 mx-2 w-3 h-3 rounded-full relative cursor-pointer"
              onClick={() => {
                handleProcess("reset-video", i);
              }}
            >
              <span
                className="absolute h-full rounded-full w-ful "
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>
        <button
          className="control-btn"
          onClick={
            isLastVideo
              ? () => handleProcess("reset-video", 0)
              : isPlaying
              ? () => handleProcess("pause-video", 0)
              : () => handleProcess("play-video", 0)
          }
        >
          {isLastVideo ? (
            <VscDebugRestart className="text-2xl text-white" />
          ) : isPlaying ? (
            <CiPause1 className="text-2xl text-white" />
          ) : (
            <CiPlay1 className="text-2xl text-white " />
          )}
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;

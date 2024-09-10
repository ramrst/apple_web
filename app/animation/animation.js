export const animateWithGsapTimeLine = (
  tl,
  rotationRef,
  rotationState,
  firstTarget,
  secoundTarget,
  animationProps
) => {
  tl.to(rotationRef.current.rotation, {
    y: rotationState,
    ease: "power2.inOut",
    duration: 0.5,
  });
  tl.to(
    firstTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
  tl.to(
    secoundTarget,
    {
      ...animationProps,
      ease: "power2.inOut",
    },
    "<"
  );
};

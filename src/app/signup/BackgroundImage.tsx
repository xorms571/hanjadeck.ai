"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function BackgroundImage({ currentStep }: { currentStep: number }) {
  const [image, setImage] = useState("/login.svg");
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(false);

    const timer = setTimeout(() => {
      if (currentStep === 0) {
        setImage("/login.svg");
      } else if (currentStep === 1) {
        setImage("/set-a-goal.svg");
      } else if (currentStep === 2) {
        setImage("/proficiency.svg");
      } else {
        setImage("/complete.svg");
      }
      setShow(true);
    }, 100); // Small delay to allow re-render

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    show ?
      <Image className="absolute fade-up0 -z-10 top-1/2 -translate-y-1/2 left-9/12" src={image} width={840} height={840} alt={`${image} background image at signup page`} />
      : null
  );
}

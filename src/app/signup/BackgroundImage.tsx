import Image from "next/image";

export default function BackgroundImage({ currentStep }: { currentStep: number }) {
  return (
    <>
      <Image className={`${currentStep === 0 ? "opcity-100 translate-x-0" : "opacity-0"} transition-all duration-800 -translate-x-96 backgoundImage absolute -z-10 top-1/2 -translate-y-1/2 left-9/12 login`} src="/login.svg" width={840} height={840} alt="login background image at signup page" />
      <Image className={`${currentStep === 1 ? "opcity-100 translate-x-0" : "opacity-0"} transition-all duration-800 -translate-x-96 backgoundImage absolute -z-10 top-1/2 -translate-y-1/2 left-9/12 set-a-goal`} src="/set-a-goal.svg" width={840} height={840} alt="set-a-goal background image at signup page" />
      <Image className={`${currentStep === 2 ? "opcity-100 translate-x-0" : "opacity-0"} transition-all duration-800 -translate-x-96 backgoundImage absolute -z-10 top-1/2 -translate-y-1/2 left-9/12 proficiency`} src="/proficiency.svg" width={840} height={840} alt="proficiency background image at signup page" />
      <Image className={`${currentStep === 3 ? "opcity-100 translate-x-0" : "opacity-0"} transition-all duration-800 -translate-x-96 backgoundImage absolute -z-10 top-1/2 -translate-y-1/2 left-9/12 complete`} src="/complete.svg" width={840} height={840} alt="complete background image at signup page" />
    </>
  );
}

import { assets } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70">
      <h1 className="sm:text-home-heading-large text-home-heading-small relative font-bold max-w-3xl mx-auto">
        Empower your futeure with the corsees designed to{" "}
        <span>fit your choice</span>
        <img
          src={assets.sketch}
          alt="sketch"
          className="md:block hidden absolute -bottom-7 right-0"
        />
      </h1>
      <p className="md:block hidden text-gray-500 max-w-2xl mx-auto">
        we bring together world-class instructors, ineractive content,and a
        supportive comminunity to help you achieve personal and professional
        goals.
      </p>
      <p className="md:hidden hidden text-gray-500 max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        personalgoals
      </p>
    </div>
  );
};

export default Hero;

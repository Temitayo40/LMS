import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center pt-10 pb-24 gap-4 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Lean anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
        obcaecati ducimus distinctio explicabo nam.
      </p>
      <div className="flex items-center mt-4 gap-6 font-medium">
        <button className="sm:px-10 sm:py-3 px-4 py-3 rounded-md text-white bg-blue-600">
          Get started
        </button>
        <button className="flex gap-2 items-center">
                    Learn more <img src={assets.arrow_icon} alt="arrow_icon"/>
        </button>
      </div>
    </div>
  );
};

export default CallToAction;

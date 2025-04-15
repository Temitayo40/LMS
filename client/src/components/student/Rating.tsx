import { useEffect, useState } from "react";

interface RatingProp {
  initialRating: number;
  onRate?: (rating: any) => Promise<void>;
}
const Rating = ({ initialRating, onRate }: RatingProp) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value: number) => {
    setRating(value);
    if (onRate) onRate(value);
  };

  useEffect(() => {
    if (initialRating) {
      setRating(initialRating);
    }
  }, [initialRating]);
  return (
    <div>
      {Array.from({ length: 5 }, (_, index) => {
        const startValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              startValue <= rating ? "text-yellow-500" : "text-gray-400"
            }`}
            onClick={() => handleRating(startValue)}
          >
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Rating;

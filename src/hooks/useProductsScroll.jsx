import { useRef, useState } from "react";

const useProductsScroll = () => {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const handleScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const setScrollRef = () => {
    if (sliderRef.current) {
      const { scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(sliderRef.current.scrollLeft > 0);
      setCanScrollRight(scrollWidth > clientWidth);
    }
  };
  return {
    canScrollLeft,
    canScrollRight,
    sliderRef,
    handleScroll,
    setScrollRef,
  };
};

export default useProductsScroll;

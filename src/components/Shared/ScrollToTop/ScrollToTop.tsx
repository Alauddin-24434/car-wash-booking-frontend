import { useState, useEffect } from "react";
import { PiMouseScrollBold } from "react-icons/pi";
const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when scrolling down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
        className="bg-[#0068d8] hover:bg-[#1a77dc] text-2xl"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "2px",
            right: "2px",
      
            color: "#fff",
            border: "none",
            padding: "10px 5px",
            borderRadius: "2px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          <PiMouseScrollBold />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;

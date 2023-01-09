import React from "react";

export default function Tooltip({ children, tooltipText }) {
  const tipRef = React.createRef(null);
  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginLeft = "20px";
  }
  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginLeft = "10px";
  }

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className=" md:hidden absolute whitespace-no-wrap bg-gray-800 text-white px-4 py-2 rounded flex items-center transition-all duration-150"
        style={{ left: "100%", opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-gray-800 h-3 w-3 absolute"
          style={{ left: "-6px", transform: "rotate(45deg)" }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
}

"use client";

const Button = ({
  children,
  onClick = () => {},
  type = "",
  className,
  disabled = false,
  submit = false,
}) => {
  let styling =
    "py-1 px-6 font-medium transition-all duration-300 ease-in-out transform";

  if (type === "primary") {
    styling +=
      " bg-[#1C5CA8] text-white hover:bg-[#14488a] rounded-md hover:shadow-lg";
  } else if (type === "outline") {
    styling +=
      " border border-[#1C5CA8] text-[#1C5CA8] rounded-md transition-colors duration-300 hover:bg-[#e6effa] hover:shadow-md";
  } else if (type === "link" || type === "active") {
    styling += " border-b-2 transition-all duration-500 ease-in-out";

    if (type === "link") {
      styling +=
        " text-gray-400 border-transparent hover:border-[#1C5CA8] hover:text-[#1C5CA8]";
    } else if (type === "active") {
      styling += " text-[#1C5CA8] border-[#1C5CA8]";
    }
  }

  return (
    <button
      className={` ${styling} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      onClick={disabled ? () => {} : onClick}
      type={submit ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};

export default Button;

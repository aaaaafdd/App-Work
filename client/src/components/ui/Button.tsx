interface ButtonProps {
  type: "button" | "submit";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({
  label,
  type,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
          px-4 py-2 rounded-lg font-medium transition-all duration-200 ease-in-out
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 
          ${
            disabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-amber-400 text-gray-800 hover:bg-amber-500 active:bg-amber-600 cursor-pointer"
          }
          shadow-sm ${!disabled && "hover:shadow-md"}
        `}
    >
      {label}
    </button>
  );
}

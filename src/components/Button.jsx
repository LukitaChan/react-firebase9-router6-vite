import ButtonLoading from "./ButtonLoading";

const Button = ({ text, type, color = "cyan", loading, onClick }) => {
  if (loading) return <ButtonLoading />;

  const classButtonBase = `text-white focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 `;

  let classColor;
  if (color === "purple") {
    classColor =
      "bg-purple-700 hover:bg-purple-800 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900";
  }
  if (color === "blue") {
    classColor =
      "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900";
  }
  if (color === "red") {
    classColor =
      "bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
  }
  if (color === "cyan") {
    classColor =
      "bg-cyan-700 hover:bg-cyan-400 focus:ring-cyan-500 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-900";
  }
  if (color === "pink") {
    classColor =
      "bg-pink-700 hover:bg-pink-800 focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-900";
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={classButtonBase + classColor}
    >
      {text}
    </button>
  );
};
export default Button;

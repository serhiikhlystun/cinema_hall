import React from "react";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="bg-gray-800">
        <h1 className="text-white text-3xl font-bold p-4">
          Welcome to My React App
        </h1>
        <p className="text-gray-300 p-4">
          This is a simple React application styled with Tailwind CSS.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click Me
        </button>
      </header>
    </div>
  );
};

export default App;

import React from "react";

const FilmCard: React.FC = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-white">Film Title</h3>
      <p className="text-gray-500 text-xs">ID 532342</p>
      <div className="flex flex-col text-left text-gray-500 text-xs">
        <p className="text-gray-300">Film description goes here.</p>
        <p>Release Date: 2023-01-01</p>
        <p>Format: Digital</p>
        <p>Cast: Jane Doe, John Smith</p>
      </div>
    </div>
  );
};

export default FilmCard;

import React from "react";
import AddFilmForm from "./AddFilmForm";
import FilmsList from "./FilmsList";

const Main: React.FC = () => {
  return (
    <main className="flex-grow">
      <h2 className="text-2xl font-bold p-4">Movie List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        <AddFilmForm />
        <FilmsList />
      </div>
    </main>
  );
};

export default Main;


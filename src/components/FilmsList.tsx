import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFilms, deleteFilmAsync } from "../features/filmsSlice";
import { RootState, AppDispatch } from "../store/store";
import { Film } from "../types";

function FilmsList() {
  const films: Film[] = useSelector((state: RootState) => state.films.films);
  const status = useSelector((state: RootState) => state.films.status);
  const error = useSelector((state: RootState) => state.films.error);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchFilms());
    }
  }, [status, dispatch]);
  console.log(status, films);
  

  const handleDelete = (id: string) => {
    dispatch(deleteFilmAsync(id));
  };

  if (status === "loading") {
    return (
      <div className="text-center mx-[auto] my-[20px]">
        Loading films...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="text-center mx-[auto] my-[20px] text-red-500">
        Error: {error}
      </div>
    );
  }

  // return (
  //   <div className="max-w-[600px] mx-[auto] my-[20px] border-[1px] border-[solid] border-[#ccc] p-[20px] rounded-[8px]">
  //     <h2>Film Collection</h2>
  //     {films.length === 0 ? (
  //       <p>No films in the collection yet. Add some!</p>
  //     ) : (
  //       <ul className="list-none p-0 m-0">
  //         {films.map((film: Film) => (
  //           <li key={film.id} className="p-[10px] border-b-[1px_dashed_#eee]">
  //             <div>
  //               <strong>{film.title}</strong> ({film.year}) - {film.format}
  //             </div>
  //             <button
  //               onClick={() => handleDelete(film.id)}
  //               className="bg-[#dc3545] text-white border-none p-[8px_12px] rounded-[5px]"
  //             >
  //               Delete
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // );
}

export default FilmsList;

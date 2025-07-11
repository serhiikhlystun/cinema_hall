import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFilmAsync } from "../features/filmsSlice";
import { AppDispatch } from "../store/store";
import { Film } from "../types";

function AddFilmForm() {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [cast, setCast] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [format, setFormat] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !cast || !year || !format) {
      alert("Please fill in all fields!");
      return;
    }

    const newFilmData: Omit<Film, "id"> = {
      title,
      format,
      year,
      cast: cast.split(",").map((actor) => actor.trim()), // Split cast by commas
    };

    try {
      await dispatch(addFilmAsync(newFilmData)).unwrap();
      setTitle("");
      setCast("");
      setFormat("");
      setYear("");
    } catch (error: any) {
      alert(`Error adding film: ${error.message}`);
      console.error("Failed to add film:", error);
    }
  };

  return (
    <div className="max-w-[600px] mx-[auto] my-[20px] border-[1px] border-[solid] border-[#ccc] p-[20px] rounded-[8px]">
      <h3>Add New Film</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-[10px]">
        <input
          type="text"
          placeholder="Film Title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="p-[8px] rounded-[4px] border-[1px] border-[solid] border-[#ddd]"
        />
        <input
          type="text"
          placeholder="Format (e.g., Blu-ray, DVD)"
          value={format}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFormat(e.target.value)
          }
          className="p-[8px] rounded-[4px] border-[1px] border-[solid] border-[#ddd]"
        />
        <input
          type="text"
          placeholder="Cast"
          value={cast}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCast(e.target.value)
          }
          className="p-[8px] rounded-[4px] border-[1px] border-[solid] border-[#ddd]"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setYear(e.target.value)
          }
          className="p-[8px] rounded-[4px] border-[1px] border-[solid] border-[#ddd]"
        />
        <button
          type="submit"
          className="bg-[#007bff] text-white border-none p-[10px_15px] rounded-[5px] cursor-pointer mt-[10px]"
        >
          Add Film
        </button>
      </form>
    </div>
  );
}

export default AddFilmForm;

import React, { useContext, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";
import instance from "../config/axios";

const Display = () => {
  const { albumsData, songsData } = useContext(PlayerContext);

  const fetchAlbums = async () => {
    const response = await instance.get("/albums/list");
    return response.data.albums;
  };

  // if (albumData[0]?._id == "") {
  //   albumData = fetchAlbums();
  // }
  const displayRef = useRef();
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((item) => item._id == albumId)?.bgColour
      : "#121212";

  console.log(bgColor);
  useEffect(() => {
    if (isAlbum) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `linear-gradient(#121212)`;
    }
  });
  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0 "
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum
                albums={albumsData.find((item) => item._id === albumId)}
              />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;

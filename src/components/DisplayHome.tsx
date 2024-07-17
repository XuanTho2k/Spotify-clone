import React, { useContext } from "react";
import Display from "./Display";
import Navbar from "./Navbar";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";
import { PlayerContext } from "../context/PlayerContext";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, idx) => (
            <AlbumItem
              key={idx}
              name={item.name}
              desc={item.desc}
              image={item.image}
              id={item._id}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, idx) => (
            <SongItem
              key={idx}
              image={item.image}
              desc={item.desc}
              name={item.name}
              id={item._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;

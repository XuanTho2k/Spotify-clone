import { useContext } from "react";
import { PlayerContext, PlayerContextType } from "../context/PlayerContext";

const SongItem = ({
  name,
  image,
  desc,
  id,
}: {
  name: string;
  image: string;
  desc: string;
  id: string;
}) => {
  const { playWithId } = useContext(PlayerContext) as PlayerContextType;
  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] "
    >
      <img src={image} alt="" className="rounded w-40 h-50" />
      <p className="font-bold mt-2 mb-1"> {name}</p>
      <p className="text-slate-200 text-sm"> {desc} </p>
    </div>
  );
};

export default SongItem;

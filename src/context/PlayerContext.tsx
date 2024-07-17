import {
  createContext,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import instance from "../config/axios";
import axios from "axios";

export const PlayerContext = createContext({});

const PlayerContextProvider = (props) => {
  const audioRef = useRef<HTMLAudioElement>();
  const seekBg = useRef();
  const seekBar = useRef();

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // play the audio
  const play = () => {
    audioRef.current?.play();
    setPlayStatus(true);
  };

  // pause the audio
  const pause = () => {
    audioRef.current?.pause();
    setPlayStatus(false);
  };

  // play song by id
  const playWithId = async (id: number) => {
    await songsData.map((item) => {
      if (id === item._id) {
        setTrack(item);
      }
    });

    await audioRef.current.play();
    setPlayStatus(true);
  };

  // play previous song
  const previous = async () => {
    songsData.map(async (item, idx) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };

  // play at a percent
  const seekSong = async (e: SyntheticEvent) => {
    audioRef.current!.currentTime =
      (e.nativeEvent.offsetX / seekBg.current?.offsetWidth) *
      audioRef.current!.duration;
  };
  // play next song
  const next = async () => {
    songsData.map(async (item, idx) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current.play();
        setPlayStatus(true);
      }
    });
  };
  // get songs data
  const getSongsData = async () => {
    try {
      const response = await instance.get("/songs/list");
      setSongsData(response.data.songs);
      setTrack(response.data.songs[0]);
    } catch (error) {}
  };

  //get album data
  const getAlbumsData = async () => {
    try {
      const response = await instance.get("/albums/list");
      setAlbumsData(response.data.albums);
    } catch (error) {}
  };
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;

import {
  createContext,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { songsData } from "../assets/frontend-assets/assets";

export const PlayerContext = createContext({});

const PlayerContextProvider = (props) => {
  const audioRef = useRef<HTMLAudioElement>();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[1]);
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
    await setTrack(songsData[id]);
    await audioRef.current?.play();
    setPlayStatus(true);
  };

  // play previous song
  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current?.play();
      setPlayStatus(true);
    }
  };

  // play at a percent
  const seekSong = async (e: SyntheticEvent) => {
    audioRef.current!.currentTime =
      (e.nativeEvent.offsetX / seekBg.current?.offsetWidth) *
      audioRef.current!.duration;
  };
  // play next song
  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current?.play();
      setPlayStatus(true);
    }
  };
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
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import instance from "../config/axios";
import { ISong } from "../types/ISong";
import { IAlbum } from "../types/IAlbum";

export interface PlayerContextType {
  audioRef: React.RefObject<HTMLAudioElement>;
  seekBg: React.RefObject<HTMLDivElement>;
  seekBar: React.RefObject<HTMLHRElement>;
  songsData: ISong[];
  albumsData: IAlbum[];
  track: ISong;
  setTrack: Dispatch<SetStateAction<ISong>>;
  play: () => void;
  previous: () => void;
  next: () => void;
  playStatus: boolean;
  setPlayStatus: Dispatch<SetStateAction<boolean>>;
  time: {
    currentTime: {
      second: number;
      minute: number;
    };
    totalTime: {
      second: number;
      minute: number;
    };
  };
  setTime: Dispatch<
    SetStateAction<{
      currentTime: {
        second: number;
        minute: number;
      };
      totalTime: {
        second: number;
        minute: number;
      };
    }>
  >;
  seekSong: (e: React.MouseEvent<HTMLDivElement>) => void;
  pause: () => void;
  playWithId: (id: string) => void;
}

export const PlayerContext = createContext<PlayerContextType | undefined>(
  undefined
);

const PlayerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const seekBg = useRef<HTMLDivElement | null>(null);
  const seekBar = useRef<HTMLHRElement | null>(null);

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);

  const [track, setTrack] = useState<ISong>(songsData[0]);
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
  const playWithId = async (id: string) => {
    await songsData.map((item: ISong) => {
      if (id === item._id) {
        setTrack(item);
      }
    });

    await audioRef.current?.play();
    setPlayStatus(true);
  };

  // play previous song
  const previous = async () => {
    songsData.map(async (item: ISong, index) => {
      if (track._id === item._id && index > 0) {
        await setTrack(songsData[index - 1]);
        await audioRef.current?.play();
        setPlayStatus(true);
      }
    });
  };

  // play at a percent
  const seekSong = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (seekBg.current) {
      audioRef.current!.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current!.duration;
    }
  };
  // play next song
  const next = async () => {
    songsData.map(async (item: ISong, index) => {
      if (track._id === item._id && index < songsData.length) {
        await setTrack(songsData[index + 1]);
        await audioRef.current?.play();
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
    } catch (error) {
      console.log(error);
    }
  };

  //get album data
  const getAlbumsData = async () => {
    try {
      const response = await instance.get("/albums/list");
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSongsData();
    getAlbumsData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current && seekBar.current) {
        audioRef.current.ontimeupdate = () => {
          if (seekBar.current && audioRef.current)
            seekBar.current.style.width =
              Math.floor(
                (audioRef.current.currentTime / audioRef.current.duration) * 100
              ) + "%";
          if (audioRef.current)
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
      }
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
      {children}
    </PlayerContext.Provider>
  );
};
export default PlayerContextProvider;

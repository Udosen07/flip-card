import { gameData } from "../utilities/gameData";
import { numberArraysReturnOne, rearrangeArray } from "../utilities/helper";
import React, { useEffect, useState } from "react";
import { updateCount, resetCount } from "../store/gameSlice";
import { useDispatch, useSelector } from "react-redux";
import celebrate from "../images/celebrate.gif";

const Home = () => {
  const [gameBlock, setGameBlock] = useState([]);
  const [selected, setSelected] = useState([]);
  const dispatch = useDispatch();
  const countValue = useSelector((state) => state.game.count);
  const [yesAudio, setYesAudio] = useState(null);
  const [noAudio, setNoAudio] = useState(null);
  const [victoryAudio, setVictoryAudio] = useState(null);
  const [displayGif, setDisplayGif] = useState(false);
  const [resetButton, setResetButton] = useState(false);

  useEffect(() => {
    const yesAudioElement = new Audio(require("../sounds/yes.mp3"));
    yesAudioElement.oncanplaythrough = () => setYesAudio(yesAudioElement);

    const noAudioElement = new Audio(require("../sounds/no.mp3"));
    noAudioElement.oncanplaythrough = () => setNoAudio(noAudioElement);

    const victoryAudioElement = new Audio(require("../sounds/victory.mp3"));
    victoryAudioElement.oncanplaythrough = () =>
      setVictoryAudio(victoryAudioElement);

    return () => {
      // Clean up event listeners
      yesAudioElement.oncanplaythrough = null;
      noAudioElement.oncanplaythrough = null;
      victoryAudioElement.oncanplaythrough = null;
    };
  }, []);

  useEffect(() => {
    if (gameBlock.length === 0) {
      const dataToTransform = numberArraysReturnOne(16, {
        min: 0,
        max: 15,
      }).shuffledArray;
      const dataToDisplay = rearrangeArray(dataToTransform, gameData);
      return setGameBlock(dataToDisplay);
    }
    console.log(gameBlock);

    const allIsMatched = gameBlock.filter((ainz) =>
      ainz.isMatched ? true : false
    );

    console.log(allIsMatched);

    if (allIsMatched.length === gameBlock.length) {
      victoryAudio.play();
      setDisplayGif(true);

      setTimeout(() => {
        victoryAudio.pause();
        victoryAudio.currentTime = 0;
        return;
      }, 2500);

      setTimeout(() => {
        setResetButton(true);
      }, 3000);
    }
  }, [gameBlock]);

  useEffect(() => {
    if (yesAudio === null || noAudio === null || victoryAudio === null) {
      return;
    } else {
      if (selected.length === 2) {
        dispatch(updateCount());
        console.log(selected);
        if (selected[0].name === selected[1].name) {
          setGameBlock(
            gameBlock.map((obj) => {
              if (obj.name === selected[1].name) {
                return { ...obj, isSelected: false, isMatched: true };
              } else {
                return obj;
              }
            })
          );
          yesAudio.play();

          setTimeout(() => {
            yesAudio.pause();
            yesAudio.currentTime = 0;
          }, 500);
          // noAudio.pause();
          // noAudio.currentTime = 0;
          // victoryAudio.pause();
          // victoryAudio.currentTime = 0;
          return setSelected([]);
        } else {
          noAudio.play();
          setTimeout(() => {
            setGameBlock(
              gameBlock.map((obj) => {
                return { ...obj, isSelected: false };
              })
            );
            noAudio.pause();
            noAudio.currentTime = 0;
          }, 500);
          // yesAudio.pause();
          // yesAudio.currentTime = 0;
          // victoryAudio.pause();
          // victoryAudio.currentTime = 0;
          return setSelected([]);
        }
      }
      console.log(selected);
    }
  }, [selected]);

  if (
    gameBlock.length === 0 ||
    yesAudio === null ||
    noAudio === null ||
    victoryAudio === null
  ) {
    return <h1>Loading...</h1>;
  }

  function resetHandler() {
    setSelected([]);
    setDisplayGif(false);
    dispatch(resetCount());
    setResetButton(false);
    const dataToTransform = numberArraysReturnOne(16, {
      min: 0,
      max: 15,
    }).shuffledArray;
    const dataToDisplay = rearrangeArray(dataToTransform, gameData);
    return setGameBlock(dataToDisplay);
  }
  return (
    <div className="h-[100vh] w-full bg-cyan-500 absolute">
      <h2 className="text-2xl font-bold text-center mt-6 text-pink-700">Tries: {countValue}</h2>
      <div
        className={`absolute top-[20%] bottom-[20%] ${
          !displayGif ? "hidden" : "flex w-full items-center justify-center"
        }`}
      >
        <img width={"400px"} src={celebrate} alt="Ryoiki tenkai" />
      </div>
      <div className="grid grid-cols-4 gap-2  container mx-auto mt-16 text-center w-[90%] bg-cyan-600 pt-12 pb-20 place-items-center">
        {gameBlock.map((data, i) => {
          return (
            <div
              onClick={() => {
                if (
                  yesAudio === null ||
                  noAudio === null ||
                  victoryAudio === null
                ) {
                  return;
                }
                if (data.isMatched === true) {
                  return;
                }
                if (
                  selected.length === 2 ||
                  (selected.length === 1 && selected[0].id === data.id) ||
                  (selected.length === 2 && selected[0].id === data.id) ||
                  (selected.length === 2 && selected[1].id === data.id)
                ) {
                  return;
                }
                setGameBlock(
                  gameBlock.map((obj) => {
                    if (obj.id === data.id) {
                      return { ...obj, isSelected: true };
                    } else {
                      return obj;
                    }
                  })
                );
                if (selected.length === 0) {
                  return setSelected([{ id: data.id, name: data.name }]);
                } else {
                  return setSelected([
                    ...selected,
                    { id: data.id, name: data.name },
                  ]);
                }
              }}
              className={`m-2 ${
                !data.isMatched ? "bg-cyan-200" : ""
              } w-[50px] md:w-[100px] h-[50px] cursor-pointer flex items-center justify-center`}
              key={i}
            >
              <i
                className={`${
                  !data.isSelected && !data.isMatched
                    ? ""
                    : data.isSelected && !data.isMatched
                    ? `text-pink-600 ${data.icon}`
                    : !data.isSelected && data.isMatched
                    ? `text-pink-300 ${data.icon}`
                    : ""
                } text-[30px]`}
              ></i>
            </div>
          );
        })}
      </div>
      {resetButton ? (
        <div  onClick={resetHandler}
        className=" flex justify-center mt-4">
        <button
          
          className="py-2 px-8 rounded-full bg-pink-600 font-medium text-pink-200"
        >
          Reset Game
        </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;

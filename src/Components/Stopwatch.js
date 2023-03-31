import React, { useState, useEffect , useContext} from "react";
import './Stopwatch.css'
import scrambleGenerator from "rubiks-cube-scramble";
import timeContext from "../Context/times/timeContext"

export default function Stopwatch() {
  
  const context = useContext(timeContext);
  const {addTime} = context;

  var [scramble, setScramble] = useState(scrambleGenerator())
  var handleNext = () => {
    setScramble(scrambleGenerator())
  }

  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (running) {
        setRunning(false);
        setStopped(true);
        addTime(time , scramble)
        setScramble(scrambleGenerator())
      }
      else {
        if (event.code === "Escape") {
          setTime(0);
        }
      }
    }

    function handleKeyUp(event) {
      if (!running && event.code === "Space" && !stopped) {
        setTime(0);
        setRunning(true);
      }
      else {
        setStopped(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [running, stopped,addTime,scramble,time]);

  useEffect(() => {
    let intervalId;

    if (running) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [running]);

  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <>
      <div className='algn' >
        {(minutes < 10 ? "0" : "") + minutes}:{(seconds < 10 ? "0" : "") + seconds}:{(milliseconds < 10 ? "0" : "") + milliseconds}
      </div>
      <div className="stimulate">

      <scramble-display scramble={scramble}></scramble-display>
      </div>
      <div className="endd">
      Scramble: {scramble}
      <br />
      <button className="btn" onClick={handleNext} >New Scramble</button>
      </div>
    </>

  );
}

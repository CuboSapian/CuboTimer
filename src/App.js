import React from "react";
import SlideNav from "./Components/SlideNav";
import Stopwatch from "./Components/Stopwatch";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimeState from "./Context/times/timeState";
import Sessions from './Components/Sessions';

export default function App() {
  return (
    <>
    <div className="wrapper">
      <TimeState>
      
      <Router>
        <div>
          <div>
            <SlideNav />
          </div>
          <div>
            <Routes>
                <Route path="/home" element="HOME"/>
                <Route path="/timer" element={ <>
                <div className="temp tab">
                  <Sessions />
                </div>
      <div><Stopwatch/></div></>} />
              </Routes>
          </div>
        </div>
      
      </Router>
    </TimeState>
   
      </div>
    </>
  );
}

import React from "react";
import SlideNav from "./Components/SlideNav";
import Stopwatch from "./Components/Stopwatch";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TimeState from "./Context/times/timeState";
import Sessions from './Components/Sessions';
import { Toaster } from 'react-hot-toast';
import Login from "./Components/login";
import Signup from "./Components/signup";

export default function App() {
  return (
    <>
      <div className="wrapper">
        {/* <div className="overlay"></div> */}
        <div>
          <Toaster position="top-center" toastOptions={{ duration: 1000 }} />
        </div>
        <div>
          <TimeState>

            <Router>
              <div>
                <div>
                  <SlideNav />
                </div>
                <div>
                  <Routes>
                    <Route path="/" element="HOME" />
                    <Route path="/timer" element={<>
                      <div className="temp tab">
                        <Sessions />
                      </div>
                      <div><Stopwatch /></div></>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                </div>
              </div>

            </Router>
          </TimeState>

        </div>
      </div>
    </>
  );
}
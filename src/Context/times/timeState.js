import React, { useState } from 'react'

import TimeContext from './timeContext';
import toast from 'react-hot-toast';

const TimeState = (props)=>{
    const host = "http://localhost:5000"
    const timesFh=[]

      const [session, setSession] = useState(timesFh)

      // GET ALL TIMES
      const getTime = async () =>{
        // API CALL PENDING
        const response=await fetch(`${host}/api/sesn/fetchSolveInfo`, {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNThkMDU1Njg5OTIxNGZmZGZlM2JiIn0sImlhdCI6MTY3OTEzMzk3M30._DT3cQbNtnL5cR0Ui1juadDravnvpeGTcbQR4ZOfA6k"
            },
        });
        const json=await response.json();
        console.log(json)
        setSession(json)
      }

      // ADD A SOLVE
      const addTime = async (tos, scramble) =>{
        // API CALL PENDING
        const response=await fetch(`${host}/api/sesn/addTime`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNThkMDU1Njg5OTIxNGZmZGZlM2JiIn0sImlhdCI6MTY3OTEzMzk3M30._DT3cQbNtnL5cR0Ui1juadDravnvpeGTcbQR4ZOfA6k"
            },
            body: JSON.stringify({tos , scramble})
        });
        const json=await response.json()
        setSession(session.concat(json))
      }

      // DELETE A SOLVE
      const deleteTime =async (id) =>{
        const response=await fetch(`${host}/api/sesn/delTime/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json',
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNThkMDU1Njg5OTIxNGZmZGZlM2JiIn0sImlhdCI6MTY3OTEzMzk3M30._DT3cQbNtnL5cR0Ui1juadDravnvpeGTcbQR4ZOfA6k"
            },
        });
        const json=response.json();
        console.log(json)

        console.log("Deleting the solve with id" + id);
        const currSession = session.filter((time)=>{return time._id!==id})
        setSession(currSession)
        toast.error("Deleted")
      }


    return(
        <TimeContext.Provider value={{session , addTime , deleteTime , getTime}}>
            {props.children}
        </TimeContext.Provider>
    )
}
export default TimeState;
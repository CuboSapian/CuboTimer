import React, { useState } from 'react'

import TimeContext from './timeContext';

const TimeState = (props)=>{
    const timesFh=[
        {
            "_id": "642356d2178c62b29b0d3507",
            "user": "64158d0556899214ffdfe3bb",
            "tos": 66742,
            "scramble": "B2 R' F' D2 U' R2 L' R F D R F D2 R2 U F2 R' D' U L2 B2",
            "date": "2023-03-28T21:06:26.521Z",
            "__v": 0
          },
          {
            "_id": "642356df178c62b29b0d3509",
            "user": "64158d0556899214ffdfe3bb",
            "tos": 57845,
            "scramble": "R' B2 F' D2 U' R2 L' R F D R F D2 R2 U F2 R' D' U L2 B2",
            "date": "2023-03-28T21:06:39.710Z",
            "__v": 0
          },
          {
            "_id": "64257469178c62b29b0d350c",
            "user": "64158d0556899214ffdfe3bb",
            "tos": 57845,
            "scramble": "R' B2 F D' D2 U' R2 L' R F D R F D2 R2 U F2 R' D' U L2 B2",
            "date": "2023-03-30T11:37:13.388Z",
            "__v": 0
          },
          {
            "_id": "64257476178c62b29b0d350e",
            "user": "64158d0556899214ffdfe3bb",
            "tos": 102845,
            "scramble": "R' B2 F D' D2 U' R2 L' R F L R F D2 R2 U F2 R' D' U L2 B2",
            "date": "2023-03-30T11:37:26.809Z",
            "__v": 0
          },
          {
            "_id": "64257488178c62b29b0d3510",
            "user": "64158d0556899214ffdfe3bb",
            "tos": 12245,
            "scramble": "R' B2 F D' D2 U' R2 L' R F L R F D2 R2 U F2 R' D' U L2 L'",
            "date": "2023-03-30T11:37:44.026Z",
            "__v": 0
          }
      ]

      const [session, setSession] = useState(timesFh)

      // ADD A SOLVE
      const addTime =(tos, scramble) =>{
        // API CALL PENDING
        const newtime = {
                "_id": "642356df1754sdfds8c62b29b0d3509",
                "user": "64158d0556899214ffdfe3bb",
                "tos": tos,
                "scramble": scramble,
                "date": "huehuehue",
                "__v": 0
        }
        setSession(session.concat(newtime))
      }

      // DELETE A SOLVE
      const deleteTime =(id) =>{
        console.log("Deleting the solve with id" + id);
        const currSession = session.filter((time)=>{return time._id!==id})
        setSession(currSession)
      }


    return(
        <TimeContext.Provider value={{session , addTime , deleteTime}}>
            {props.children}
        </TimeContext.Provider>
    )
}
export default TimeState;
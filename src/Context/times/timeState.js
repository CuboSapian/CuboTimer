import React, { useState } from 'react'

import TimeContext from './timeContext';
import toast from 'react-hot-toast';

const TimeState = (props) => {
    const host = "http://localhost:5000"
    const timesFh = []

    const [session, setSession] = useState(timesFh)

    // GET ALL TIMES
    const getTime = async () => {
            const response = await fetch(`${host}/api/sesn/fetchSolveInfo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
            });
            const json = await response.json();
            setSession(json)

    }

    // ADD A SOLVE
    const addTime = async (tos, scramble) => {
        // API CALL PENDING
        if(localStorage.getItem('token'))
        {
            const response = await fetch(`${host}/api/sesn/addTime`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('token')
                },
                body: JSON.stringify({ tos, scramble })
            });
            const json = await response.json()
            setSession(session.concat(json))
        }
        else
        {
            // var date = Date.now;
            // if(localStorage.getItem('localSolve'))
            // {
                var a={}    ;
                a=JSON.parse(localStorage.getItem('localSolve'));
                a.push({tos,scramble});
                localStorage.setItem('localSolve' , JSON.stringify(a));
                setSession(JSON.parse(localStorage.getItem('localSolve')));
            // }
            // else{
            //     var b={}    ;
            //     b.push({tos,scramble});
            //     localStorage.setItem('localSolve' , JSON.stringify(b));
            //     setSession(JSON.parse(localStorage.getItem('localSolve')));
            //     console.log(session)
            // }
        }
    }

    // DELETE A SOLVE
    const deleteTime = async (id) => {
        const response = await fetch(`${host}/api/sesn/delTime/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = response.json();
        const currSession = session.filter((time) => { return time._id !== id })
        setSession(currSession)
        toast('Deleted Successfully!', {
            id: 'deleteuniqueiid',
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
            </svg>,
        });
    }


    return (
        <TimeContext.Provider value={{ session, addTime, deleteTime, getTime }}>
            {props.children}
        </TimeContext.Provider>
    )
}
export default TimeState;
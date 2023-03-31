import React, { useContext , useRef, useEffect} from 'react'
import './Sessions.css'
import timeContext from "../Context/times/timeContext"
import { toast } from 'react-hot-toast';
// import BootstrapTable from 'react-bootstrap-table-next';

// import toast from 'react-hot-toast';

const Sessions = () => {

    const context = useContext(timeContext);
    const { session , deleteTime , getTime} = context;
    const ref = useRef(null)

    useEffect(() => {
        getTime()
    }, [t])
    

    const showDetails=(time)=>{
        // console.log("clicked")
        var scdata=time.scramble;
        toast.success(scdata +" Time  "+ time.tos+ "msec")
        console.log(time._id)
        ref.current.click();
    }

    const tableRows = session.slice(0).reverse().map((time) => {


        const minutes = Math.floor((time.tos / 1000 / 60) % 60);
        const seconds = Math.floor((time.tos / 1000) % 60);
        const milliseconds = Math.floor((time.tos % 1000) / 10);

        return (
            <>  
            <tr key={time._id}>
                <td className="ptr" onMouseOver={()=>{showDetails(time)}}> {(minutes < 10 ? "0" : "") + minutes}:{(seconds < 10 ? "0" : "") + seconds}:{(milliseconds < 10 ? "0" : "") + milliseconds}</td>
                <td className="ptr" onMouseOver={()=>{showDetails(time)}}>{time.date}</td>
                <td className='ptr' align='center'><div className='del'  onClick={()=>{deleteTime(time._id)}}>🛑</div></td>
                <td className='ptr'></td>
            </tr>
        </>
        )
    });


    return (
        <>

            <div className='rowC'>

                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Date</th>
                            <th>Delete</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>

            </div>

        </>
    ) 
}

export default Sessions
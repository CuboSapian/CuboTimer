import React, { useContext , useEffect} from 'react'
import './Sessions.css'
import timeContext from "../Context/times/timeContext"
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
// import BootstrapTable from 'react-bootstrap-table-next';

// import toast from 'react-hot-toast';

const Sessions = () => {

    const context = useContext(timeContext);
    const { session , deleteTime , getTime} = context;
    let history= useNavigate();
    // const ref = useRef(null)

    useEffect(() => {
        if(localStorage.getItem('token')){
            getTime()
        }
        else{
            history('/login');
        }


    },[getTime, history])    

    const showDetails=(time)=>{
        // console.log("clicked")
        var scdata=time.scramble;
        toast("Scramble: "+scdata ,{
            icon:<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-box" viewBox="0 0 16 16">
            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
          </svg>,
            style: {
                minWidth: '600px',
                marginTop:'30px',
                padding:'20px',
                fontSize:'18px',
                fontFamily:'bolder',
                backgroundColor:'#212529',
                color:'red'
              },
            id:"uniquesession",
            duration:1000000,
        })
        console.log(time._id)
        // ref.current.click();
    }
    const toastclose=()=>{
        toast.dismiss();
    }
    const tableRows = session === null ? console.log("NULL")  : session.slice(0).reverse().map(({tos,scramble,_id}) => {


        const minutes = Math.floor((tos / 1000 / 60) % 60);
        const seconds = Math.floor((tos / 1000) % 60);
        const milliseconds = Math.floor((tos % 1000) / 10);

        return (
            <>  
            <tr key={_id}>
                <td className="ptr" onMouseEnter={()=>{showDetails({scramble,tos,_id})}} onMouseOut={()=>toastclose()}> {(minutes < 10 ? "0" : "") + minutes}:{(seconds < 10 ? "0" : "") + seconds}:{(milliseconds < 10 ? "0" : "") + milliseconds}</td>
                {/* <td className="ptr" onMouseOver={()=>{showDetails({scramble,tos,_id})}}  onMouseOut={()=>toastclose()}>{date}</td> */}
                <td className='ptr' align='center'><div className='del'  onClick={()=>{deleteTime(_id)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg></div></td>
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
                            {/* <th>Date</th> */}
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

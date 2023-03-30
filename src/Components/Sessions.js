import React, { useContext , useRef} from 'react'
import './Sessions.css'
import timeContext from "../Context/times/timeContext"
// import BootstrapTable from 'react-bootstrap-table-next';

// import toast from 'react-hot-toast';

const Sessions = () => {

    const context = useContext(timeContext);
    const { session } = context;
    const ref = useRef(null)

    const showDetails=(time)=>{
        console.log("clicked")
        ref.current.click();
    }

    const tableRows = session.slice(0).reverse().map((time) => {


        const minutes = Math.floor((time.tos / 1000 / 60) % 60);
        const seconds = Math.floor((time.tos / 1000) % 60);
        const milliseconds = Math.floor((time.tos % 1000) / 10);

        return (
            <tr key={time._id} onClick={()=>{showDetails(time)}}>
                <td className="ptr" onClick={()=>{showDetails(time)}}> {(minutes < 10 ? "0" : "") + minutes}:{(seconds < 10 ? "0" : "") + seconds}:{(milliseconds < 10 ? "0" : "") + milliseconds}</td>
                <td className="ptr" onClick={()=>{showDetails(time)}}>{time.date}</td>
            </tr>
        )
    });


    return (
        <>
        <>
  <button ref={ref} type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>

  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Modal title
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">...</div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal" >
            Close
          </button>
          <button type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</>

            <div className='rowC'>

                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            {/* <th className="click">⌕</th> */}
                            <th>Time</th>
                            <th>Date</th>
                            <th>Get More Info</th>
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
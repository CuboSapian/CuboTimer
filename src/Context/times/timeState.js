import TimeContext from './timeContext';

const TimeState = (props)=>{
    const s1={

    }
    return(
        <TimeContext.Provider value={s1}>
            {props.children}
        </TimeContext.Provider>
    )
}
export default TimeState;
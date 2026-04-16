import React , { useState, useEffect, useRef } from "react";
import styles from "../styles/styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  setSolveGridData,
  setResetGridData
} from "../store/crosswordSlice";


const ControlPanel = ({
    setCheckAnswer,
    setAnswerCheckData,
}) => {

    const gridData = useSelector((state)=> state.crossword?.currentGridData)
    const crosswordSolution = useSelector((state)=> state.crossword?.crosswordSolution)
    const dispatch = useDispatch();
    const intervalRef = useRef(null);
    const [time, setTime] = useState({
        minutes: 0,
        seconds: 0,
    });


    const checkAnswersFun = () => {
        let row = []
        let col = []

        gridData.forEach((gridRow,rowIndex)=>{
            col = []
            gridRow.forEach((gridCol,colIndex)=>{
                if(gridCol !== "#")
                {
                    if(gridCol.toUpperCase() === crosswordSolution[rowIndex][colIndex])
                    {
                        col.push(true)
                    }
                    else
                    {
                        col.push(false)
                    }
                }
                else
                {
                    col.push("#")
                }
            })
            row.push(col)
        })

        setCheckAnswer(true)
        setAnswerCheckData(row)
    }

    // Timer
     useEffect(() => {
    // prevent multiple intervals
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev.seconds === 59) {
          return { minutes: prev.minutes + 1, seconds: 0 };
        }
        return { minutes: prev.minutes, seconds: prev.seconds + 1 };
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, []);


    return (
        <>
            <div className={styles.controlPanelContainerSty}>
                <div className={styles.timerSty}>
                <span>Timer</span>
                <span>
                    {String(time.minutes).padStart(2, "0")}:
                    {String(time.seconds).padStart(2, "0")}
                </span>
                </div>
                
                <div>
                <button 
                    onClick={checkAnswersFun}>
                        check Answer
                </button>

                <button 
                    onClick={()=>{
                        dispatch(setSolveGridData())
                    }}
                >
                    solve crossword
                </button>

                <button 
                    onClick={()=>{
                        dispatch(setResetGridData())
                        setCheckAnswer(false)
                    }}
                >
                    clear crossword
                </button>
                </div>
            </div>
        </>
    )
}

export default ControlPanel;
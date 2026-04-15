'use client'

import React , { useState, useEffect, useRef } from "react";
import styles from "./styles/styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import ControlPanel from "./components/ControlPanel";
import Clue from "./components/Clue";
import Crossword from "./components/Crossword";
import { 
  setUpdateCrosswordData,
} from "./store/crosswordSlice";


 function Home() {

  const crosswordData = useSelector((state)=> state.crossword?.currentCrosswordData)
  const dispatch = useDispatch();
  const [activeClue, setActiveClue] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [answerCheckData, setAnswerCheckData] = useState([]);



  //used for add cells coordinates in redux
  const generateCellsCoordinatesFun = () => {
    let newCrosswordData = crosswordData.map((clue)=>({
      ...clue,
      colCoordinates: clue.direction === "across" ? Array.from({ length: clue.answer.length }, (_, i) => i + clue.col) : [clue.col],
      rowCoordinates: clue.direction === "down" ? Array.from({ length: clue.answer.length }, (_, i) => i + clue.row) : [clue.row],
    }))

    dispatch(setUpdateCrosswordData(newCrosswordData))    
  }

  useEffect(()=>{
    generateCellsCoordinatesFun()
  },[])


  return (
    <div className={styles.mainContainer}>
      <h1>
        Crossword Puzzel
      </h1>

      <h6>
        Use arrow keys to navigate - Use click to switch between select across or down highlight inside the grid
      </h6>

      <ControlPanel
        setCheckAnswer={setCheckAnswer}
        setAnswerCheckData={setAnswerCheckData}
      />
      
      <div className={styles.gameContainerSty}>
        <Clue 
          activeClue={activeClue}
          setActiveClue={setActiveClue}
        />
        
        <Crossword 
          checkAnswer={checkAnswer}
          answerCheckData={answerCheckData}
          setActiveClue={setActiveClue}
        />
      </div>
    </div>
  );
}


export default Home;
